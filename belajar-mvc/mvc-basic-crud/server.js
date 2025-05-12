import http from 'http';
import { getAccount, postAccount } from "./controller/accountcontroller.js";
import { URL } from 'url';

const myServer = http.createServer(function handler(req, res) {

    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathName = fullUrl.pathname;

    switch (pathName) {
        case "/api/account":
            getAccount(req, res);
            break;

        case "/api/account/post":
            postAccount(req, res)
    
        default:
            break;
    }
});

myServer.listen(3000, () => {
    console.info(`Server running on port 300`)
})