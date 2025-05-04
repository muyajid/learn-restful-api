const http = require('http');

const VALID_APIKEY = '123456789-poiuytrewq';
const books = [
  {id: 1, judul: "path finder first in last out", author: "miyamoto muzaki"},
  {id: 2, judul: "senin berperang", author: "sun yin"},
  {id: 3, judul: "babad tanah jawi", author: "pangeran samber nyowo"},
  {id: 4, judul: "negeri 5 menara", author: "alif"},
  {id: 5, judul: "bumi dan manusia", author: "pramodya anatha toer"}
];

const server = http.createServer(function handler(req, res) {

  const path = req.url;
  const header = req.headers['api-key'];

  if (path === '/books' && req.method === 'GET') {
    if (header === VALID_APIKEY) {

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(books));

    } else {

      res.writeHead(401, { "content-type": "application/json" });
      res.end(JSON.stringify( { "message": "unauthorized" } ));

    }
  } else {

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify( { "message": "page not found chek method pliss "} ));

  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
})