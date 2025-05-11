import http from "http";
import { URL } from "url";
import { getData, postData } from "./controller/controller.js";

const myServer = http.createServer( function handler(req, res) {

    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathName = fullUrl.pathname;

    switch (pathName) {
        case "/api/account":
            try {
                getData(req, res)
            } catch (error) {
                console.error(`Internal server eror`);
            }
            break;

        case "/api/account/post":
            try {
                postData(req, res);
            } catch (error) {
                console.error(`Internal server eror`);
            }
            break;
    
        default:
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "PAGE NOT FOUND" }));
            break;
    }
});

myServer.listen(3000, () => { console.info(`running`) });