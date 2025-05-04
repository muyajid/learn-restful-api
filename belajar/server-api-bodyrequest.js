const http = require("http");

// Variable menyimmpan API-KEY dan alamat PORT
const VALID_API_KEY = "1501200920022009";
const PORT = 3000;

// Membuat server
const server = http.createServer(function handler(req, res) {
  // Variable menyimpan path yang di akses client
  const path = req.url;
  // Variable menyimpan method yang di request client
  const method = req.method;
  // Variable menyimpan header api-key yang di kirim client
  const reqHeader = req.headers["api-key"];

  switch (path) {
    // Bila client akses path sendData
    case "/sendData":
      // Lakukan pengecekan apakah method nya sesuai dengan yang diinginkan dan apakah api-key nya valid
      if (method === "POST" && reqHeader === VALID_API_KEY) {
        // Variable yang menyimpan potongan data yang di kirim client
        let chunksArr = [];
        // Mengumpulkan potongan potongan data buffer ke dalam array
        req.on("data", (chunk) => {
          chunksArr.push(chunk);
        });

        req.on("end", () => {
          try {
            // Menggabungkan potongan potongan data menjadi satu kesatuan buffer
            const concatData = Buffer.concat(chunksArr);
            // Mengubah buffer menjadi string dan merubah nya menjadi object javascript
            const parsedData = JSON.parse(concatData.toString());
            // Cetak data ke console
            console.log(parsedData.name);

            // Kirim pemberitahuan ke client kalau data berhasil di terima
            res.writeHead(200, { "content-type": "application/json" });
            // Ubah jadi string JSON dan kirim ke client
            res.end(
              JSON.stringify({
                message: "Data Berhasil Di Terima Server",
                data: parsedData,
              })
            );
          } catch (error) {
            // Apabila gagal dalam melakukan concat buffer atau parse data ke object JS
            res.writeHead(400, { "content-type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Body harus format stuktur JSON yang valid",
              })
            );
          }
        });
      } else {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Method Harus Post Dan Api Key Harus Valid"}));
      }
      break;

    default:
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify( { message: "PAGE NOT FOUND" }));
      break;
  }
});

// Menjalankan server melalui port 3000
server.listen(PORT, () => { console.info(`Server running on port ${PORT}`) });
