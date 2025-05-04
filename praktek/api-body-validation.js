const http = require('http');

function sendJSON(res, statusCode, message) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(message));
};

function validationJSON(req, res, statusCode, message) {
    if (req.headers['content-type'] !== "application/json" ) {
        res.writeHead(statusCode, { "Content-Type": "application/json" });
        res.end(JSON.stringify(message));
        return true;
    }
    return false;
}

const VALID_API_KEY = "1501200920022009";
const PORT = 3000;
const account = [
    { id: 1, username: "admin", password: "Admin123" },
    { id: 2, username: "melody", password: "melodyPass" },
    { id: 3, username: "yazid", password: "yazidPass" },
    { id: 4, username: "john doe", password: "johndoePass" },
    { id: 5, username: "emilys", password: "emilysPass" }
];

const server = http.createServer(function handler(req, res) {

    switch (req.url) {
        case '/login':
            if (req.method === 'POST' && req.headers['api-key'] === VALID_API_KEY) {
                
                if (validationJSON(req, res, 400, { message: `Data Harus Dalam Format JSON`})) { return; };

                let chunksArr = [];

                req.on("data", (chunk) => { chunksArr.push(chunk) });

                req.on("end", () => {
                    try {
                        const concatChunks = Buffer.concat(chunksArr);
                        const parsedChunks = JSON.parse(concatChunks.toString());

                        if (!parsedChunks.username && !parsedChunks.password) {
                            sendJSON(res, 400, { message: `Key Username Dan Key Password Harus Ada `}); 
                            return;
                        }

                        let foundAccount = account.find((acc) => {
                            return acc.username === parsedChunks.username && acc.password === parsedChunks.password;
                        });
                        
                        if (foundAccount) {
                            sendJSON(res, 200, { message: `Login Berhasil`, data: foundAccount });
                            console.log(foundAccount);
                            
                        } else { 
                            sendJSON(res, 401, { message: `Login Gagal` } );
                            console.log(foundAccount);
                            
                        };

                    } catch (error) {
                        sendJSON(res, 400, { message: `Pastikan Format JSON benar`, error: error });
                        console.log(foundAccount);
                        
                    }
                })
            } else {
                sendJSON(res, 401, { message: `pastikan method dan api-key benar` });
            }
            break;
    
        default:
            sendJSON(res, 404, { message: `PAGE NOT FOUND` });
            break;
    };
});

server.listen(PORT, () => {
    console.info(`|| SERVER RUNNING ON PORT => ${PORT}`);
})