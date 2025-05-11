// Import module http bawaan node JS
const http = require('http');

// Membuat http server
const server = http.createServer((req, res) => {
    
    // Flow control untuk client akses path
    switch (req.url) {
        case '/sendData':
            // Pengecekan apakah method dan api key nya sesuai
            if (req.method === 'POST' && req.headers['api-key'] === '1501200920022009') {
                
                // Pengecekan data yang di kirim oleh clinent
                if (req.headers['content-type'] !== "application/json") {
                    // Kirim pemberitahuan ke client bahwa data harus berupa JSON
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify( { message: "Data harus dalam format JSON" }));
                    return;
                }

                // array yang digunakan untuk menampung potongan potongan data
                let chunkArr = [];

                // listerner yang nangkap potongan potongan datas
                req.on("data", (chunk) => {
                    chunkArr.push(chunk);
                });

                // listener apabila data sudah berhasil terkumpul semua 
                req.on("end", () => {
                    // Menangani crash
                    try {
                        // Berpotensi eror
                        // Menggabungkan potongan data buffer menjadi satu buffer
                        const concatData = Buffer.concat(chunkArr);
                        // Merubah data buffer yang sudah jadi satu menjadi string lalu dirubah jadi object JS
                        const parsedData = JSON.parse(concatData.toString());
                        console.log(parsedData);
                        
                        // Kirim data kembali ke client dalam format JSON 
                        res.writeHead(200, { "content-type": "application/json" });
                        res.end(JSON.stringify(
                            {
                                message: "Data berhasil di terima server",
                                data: parsedData
                            }
                        ));
                    } catch (error) {
                        // Apabila terjadi eror dari proses concat data atau proses parse ke object 
                        // block ini akan di jalankan
                        res.writeHead(400, { "content-type": "application/json" });
                        res.end(JSON.stringify( { message: `Eror ${error}` }));
                    }
                })
            } else {
                // Apabila in valid api key dan in valid method 
                res.writeHead(401, { "content-type": "application/json" });
                res.end(JSON.stringify( { message: `In valid api key or method` }));
            }
            break;
    
        default:
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify( { message: "PAGE NOT FOUND" }));
            break;
    }
});

// Menjalankan server
server.listen(3000, () => {
    console.info(`Server running on port 3000`);
});