const http = require("http");

const VALID_KEY = "123456789-poiuytrewq";
const productsData = [
  { id: 1, name: "nasi goreng", harga: 15000 },
  { id: 2, name: "mie goreng", harga: 14000 },
  { id: 3, name: "sate ayam", harga: 13000 },
  { id: 4, name: "tongseng ayam", harga: 20000 },
  { id: 5, name: "tongseng kambing", harga: 17000 },
];
const PORT = 3000;

const server = http.createServer(function handler(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  const query = parsedUrl.searchParams;
  const reqHeaders = req.headers["api-key"];

  switch (path) {
    case "/books":
      if (reqHeaders === VALID_KEY) {

        if (!query.get("name")) {
          res.writeHead(200, { "content-type": "application/json" });
          res.end(
            JSON.stringify({ message: "Query parameter name dibutuhkan " })
          );
          return;
        }

        const filteredData = productsData.filter((data) => {
          return data.name === query.get("name");
        });

        if (filteredData.length === 0) {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ message: "data tidak di temukan" }));
        } else {
          res.writeHead(200, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              message: "data berhasil ditemukan",
              data: filteredData
            })
          );
        }
      } else {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify( { message: `unathorized` }));
      }
      break;

    default:
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify( { message: `Page Not Found` }));
      break;
  }
});

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
})