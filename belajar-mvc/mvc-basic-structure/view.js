const http = require('http');
const { getAllQuotes } = require('./controller/controller');
const { URL } = require('url');

const server = http.createServer(function handler(req, res) {

    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathName = fullUrl.pathname;
    console.log(fullUrl);
    
    switch (pathName) {
        case "/api/quote":
            try {
                getAllQuotes(req, res);
            } catch (err) {
                res.writeHead(505, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "Internal Server Eror" }));
            }
            break;
    
        default:
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `Page Not Found` }));
            break;
    }
});

server.listen(3000, () => {
    console.info(`Server running on port 3000`);
})