const http = require('http');

const VALID_API_KEY = '1501200920022009';
const account = [
    { id: 1, username: "admin", password: "admin123" },
    { id: 2, username: "cleonima", password: "clc123" },
    { id: 3, username: "yazid", password: "yzd123" },
    { id: 4, username: "callista", password: "cls123" },
    { id: 5, username: "chickcorea", password: "cc123" },
    { id: 6, username: "Zee", password: "16524201128"}
];

const server = http.createServer(function handler(req, res) {

    switch (req.url) {
        case '/login':
            if (req.method === 'POST' && req.headers['api-key'] === VALID_API_KEY) {
                
                if (req.headers['content-type'] !== 'application/json') {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: `Data Yang Dikirim Harus Dalam Format JSON` }));
                    return;
                }

                let chunkArr = [];

                // request listener hanya menangkap data body dan query string header
                req.on("data", (chunk) => { chunkArr.push(chunk) });

                req.on("end", () => {
                    try {

                        const concatData = Buffer.concat(chunkArr);
                        const parsedData = JSON.parse(concatData.toString());

                        if (!parsedData.username && !parsedData.password) {
                            res.writeHead(400, { "content-type": "application/json" });
                            res.end(JSON.stringify({ message: `username key dan password key harus ada` }));
                            return;                            
                        }

                        const founData = account.find((account) => {
                            return parsedData.username === account.username && parsedData.password === account.password;
                        });

                        console.log(founData);
                        
                        if (founData) {
                            res.writeHead(200, { "content-type": "application/json" });
                            res.end(JSON.stringify({
                                message: `Login berhasil`, 
                                data: founData
                            }));
                        } else {
                            res.writeHead(401, { "content-type": "application/json" });
                            res.end(JSON.stringify({
                                message: `Login gagal username || password salah`,
                                data: founData
                            }));
                        }
                    } catch (error) {
                        res.writeHead(400, { "content-type": "application/json" });
                        res.end(JSON.stringify({
                            message: `Bad Request`,
                            errMessage: `${error}`
                        }));
                    }
                });
            } else {
                res.writeHead(401, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    message: `UNAUTHORIZED`
                }));
            }
            break;
    
        default:
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `PAGE NOT FOUND`}));
            break;
    }
});

server.listen(3000, () => {
    console.info(`|| SERVER RUNNING ON PORT => 3000`);
})