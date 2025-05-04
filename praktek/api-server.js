const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "application/json"});
    res.end(JSON.stringify({
        "quotes": [
            {
                "quote": "to get something we never head we must do something we never did",
                "author": "M . Yazid Arsy"
            },
            {
                "quote": "Dirimu terbentuk dari pikiran mu sendiri",
                "author": "M. Yazid Arsy"
            },
            {
                "quote": "Segenggam kekuasan lebih berharga dari sekeranjang kebenaran",
                "author": "M. Yazid Arsy"
            }
        ]
    }));
});

server.listen(3000, () => {
    console.info(`Server running on port 3000`);
});