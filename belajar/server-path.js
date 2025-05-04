const http = require("http");

const srv = http.createServer((req, res) => {
  const path = req.url;
  if (path === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`Hello World`);
  } else if (path === "/quotes") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        quotes: [
          {
            quote:
              "To get something we never had we must do something we never did",
            author: "M. Yazid Arsy",
          },
          {
            quote:
              "Segenggam kekuasan lebih berharga dari sekeranjang kebenaran",
            author: "M. Yazid Arsy",
          },
          {
            quote: "Orang orang membentuk diri nya dari cara mereka berpikir",
            author: "M. Yazid Arsy",
          },
        ],
      })
    );
  } else if (path === "/music-album") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        "music-album": [
          {
            "album-title": "19",
            "song-list": ["rein", "kangen", "bayang bayang"],
          },
          {
            "album-title": "terbaik - terbaik",
            "song-list": ["restoe boemi", "terbaik - terbaik", "IPS"],
          },
          {
            "album-title": "pandawa lima",
            "song-list": ["kamulah satu satunya", "aku disini untuk mu"],
          },
        ],
      })
    );
  } else {
    // 404 status code page not found
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Page Not Found");
  }
});

srv.listen(3000, () => {
    console.info(`Server running on port 3000`);
})
