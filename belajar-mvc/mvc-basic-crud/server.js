import http from 'http';
import { deleteAccount, getAccount, postAccount, updateAccount } from "./controller/accountcontroller.js";
import { URL } from 'url';

const myServer = http.createServer(function handler(req, res) {

    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathName = fullUrl.pathname;

    switch (pathName) {
        case "/api":
            res.writeHead(200, { "content-type": "text/plain"});
            res.end("Hello World");
            break;

        case "/api/account/get":
            getAccount(req, res);
            break;

        case "/api/account/post":
            postAccount(req, res)
            break;

        case "/api/account/put":
            updateAccount(req, res);
            break;

        case "/api/account/delete":
            deleteAccount(req, res);
            break;
            
        default:
            break;
    }
});

myServer.listen(3000, () => {
    console.info(`http://localhost:3000/api`)
})