const http = require('http');

const APIKEY = '12345-ABCD-EFG';
const server = http.createServer((req, res) => {
    if (req.headers['api-key'] === APIKEY) {
        res.writeHead(200, { "content-type": "text/plain"});
        res.end(`Api Key Valid`);
    } else {
        res.writeHead(401, { "content-type": "text/plain" });
        res.end(`Api Key Tidak Valid Dibutuhkan Api Key Untuk Akses Resource`);
    }
});

server.listen(3000, () => {
    console.info(`Server running on port 3000`);
});