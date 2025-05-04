// memanggil module http bawaan node JS
const { log } = require('console');
const http = require('http');

// membuat server dengan method createServer dari http module 
// mengisi parameter createServer dengan arrow function untuk handler request dan respon 
const server = http.createServer((req, rest) => {
    // .writeHead digunakan untuk ngirim status code dan header sebelum ngirim data
    rest.writeHead(200, { "content-type": "text/plain"});
    // .end untuk ngirim data dan nutup koneksi ke server
    rest.end(`Hello Word From Server`)
});

// .listen merupakan function yang digunakan untuk set port dan menjalankan server
// parameter nya ada port dan callback apabila server sudah jalan
server.listen(3000, () => {
    console.info(`Server running on port 3000`);
});