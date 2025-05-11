const http = require('http');

const server = http.createServer((req, res) => {
    const path = req.url;
    if (path === '/') {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Hello World api-path.js");
    } else if (path === '/quotes') {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            "quotes": [
                {
                    "quote": "To much love will kil you",
                    "author": "M. YAZID ARSY"
                },
                {
                    "quote": "To get something we never had we must do something we never did",
                    "author": "M. YAZID ARSY"
                },
                {
                    "quote": "Get the funk out",
                    "author": "M. YAZID ARSY"
                }
            ]
        }));
    } else if (path === '/album-music') {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            "dewa19": [
                {
                    "album-name": "19",
                    "song-list": ["rein", "kangen", "swear"]
                },
                {
                    "album-name": "terbaik terbaik",
                    "song-list": ["IPS", "Restoe Boemi", "Jalan Kita Masih Panjang"]
                },
                {
                    "album-name": "bintang lima",
                    "song-list": ["risalah hati", "sayap sayap patah", "roman picisan"]
                }
            ]
        }));
    } else {
        res.writeHead(404, { "content-type": "text/plain"});
        res.end("Page Not Found");
    }
});

console.log(server);
server.listen(3000, () => {
    console.info(`Server running on port 3000`);
    console.log(server.address());
})
