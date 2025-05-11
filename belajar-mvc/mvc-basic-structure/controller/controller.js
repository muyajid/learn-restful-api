const { getQuotes } = require(`../model/model`);

function getAllQuotes(req, res) {
    // Check method
    if (req.method !== "GET") {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: `Invalid method` }));
        return;
    }

    const arr = getQuotes();

    // Validasi data tidak kosong 
    if (arr.length === 0) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: `Empty Data` }));
        return;
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(arr));
}

module.exports = { getAllQuotes }