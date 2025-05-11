import { data } from "../model/data.js";

function getData(req, res) {
    if (req.method !== "GET") {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: 'Invalid method' }));
        return;
    }

    if (data.length === 0) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: 'Empty Data' }));
        return;
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
};
let defaultId = data[data.length - 1].id;
function postData(req, res) {

    if (req.method !== "POST") {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: 'Invalid method'}));
        return;
    }

    let chunks = [];

    req.on("data", (chunk) => {
        chunks.push(chunk);
    });

    req.on("end", () => {
        try {
            const concatData = Buffer.concat(chunks);
            const parsedData = JSON.parse(concatData.toString());

            const { username, password } = parsedData;

            if (!username || !password) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: `Invalid data`}));
                return;
            }

            const findDuplicate = data.find((arr) => {
                return arr.username === username && arr.password === password;
            })

            if (findDuplicate) {
                res.writeHead(409, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: `Account has ben reqistered` }));
                return;
            }

            const postData = {
                id: defaultId++,
                username: username,
                password: password
            };

            data.push(postData);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `Succesfullt register account` }));
        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" });
            res.end(JSON.stringify(err));
        }
    });
};

export { getData, postData };