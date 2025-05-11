const http = require('http');

const VALID_KEY = '12356789-piuytrewq';
const productData = [
    { id: 1, name: "sate ayam madura", price: 15000},
    { id: 2, name: "sate kambing madura", price: 20000},
    { id: 3, name: "nasii goreng pemalang", price: 15000}, 
    { id: 4, name: "rawon daging sapi", price: 15000},
    { id: 5, name: "ketoprak telor", price: 15000}
];
const PORT = 3000;

const server = http.createServer(function handler(req, res) {

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const searchParams = parsedUrl.searchParams;
    const reqHeaders = req.headers['api-key'];

    switch (path) {
        case '/products':
            if (reqHeaders === VALID_KEY) {

                if (searchParams.get('name') === null) {
                    res.writeHead(404, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: "query dengan param name di perlukan"}));
                    return;
                }

                const searchProducts = productData.filter((product) => {  return searchParams.get('name') === product.name});

                if (searchProducts.length === 0) {
                    res.writeHead(404, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: "product tidak di temukan" }));
                } else {
                    res.writeHead(200, { "content-type": "application/json" });
                    res.end(JSON.stringify(searchProducts));
                }
            } else {
                res.writeHead(401, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "tidak di izinkan akses data"}));
            }
            break;
    
        default:
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "PAGE NOT FOUND" }));
            break;
    }
});

server.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
})