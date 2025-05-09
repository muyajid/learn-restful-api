const http = require("http");
const { URL } = require("url");

function sendJSON(res, statusCode, message) {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(message));
}

function validationData(req, validData) {
  if (req.headers["content-type"] !== validData) {
    return true;
  }
  return false;
}

function validationMethod(req, method) {
  if (req.method !== method) {
    return true;
  }
  return false;
}

const todolist = [];
const PORT = 3000;
let currentId = 1;

const server = http.createServer(function handler(req, res) {
  const fullURL = new URL(req.url, `http://${req.headers.host}`);
  const queryParam = fullURL.searchParams;

  const path = fullURL.pathname;

  switch (path) {
    case "/api":
      if (validationMethod(req, "GET")) {
        sendJSON(res, 401, { message: `Invalid method` });
        return;
      }

      sendJSON(res, 200, { message: `Hello World` });
      break;

    case "/api/todo":
      if (validationMethod(req, "GET")) {
        sendJSON(res, 401, { message: `Invalid method` });
        return;
      }

      if (todolist.length === 0) {
        sendJSON(res, 404, { message: `Empty data` });
        return;
      }

      sendJSON(res, 200, todolist);
      console.log(todolist);

      break;

    case "/api/todo/random":
      if (validationMethod(req, "GET")) {
        sendJSON(res, 401, { message: `Invalid method` });
        return;
      }

      if (todolist.length === 0) {
        sendJSON(res, 404, { message: `Empty Data` });
        return;
      }

      const randomIndex = Math.floor(Math.random() * todolist.length);
      const randomTodo = todolist[randomIndex];

      sendJSON(res, 200, randomTodo);
      console.log(randomTodo);

      break;

    case "/api/todo/add":
      if (validationMethod(req, "POST")) {
        sendJSON(res, 401, { message: `Invalid method` });
        return;
      }
      if (validationData(req, "application/json")) {
        sendJSON(res, 400, { message: `Invalid data format` });
        return;
      }

      let chunksCreate = [];

      req.on("data", (chunk) => {
        chunksCreate.push(chunk);
      });

      req.on("end", () => {
        try {
          const concatChunk = Buffer.concat(chunksCreate);
          const parsedChunk = JSON.parse(concatChunk.toString());

          const { todo, completed } = parsedChunk;

          if (typeof todo !== "string" || typeof completed !== "boolean") {
            sendJSON(res, 400, {
              message: `Todo must string and completed must boolean`,
            });
            return;
          }

          const newTodo = {
            id: currentId++,
            todo: todo,
            completed: completed,
          };

          sendJSON(res, 200, { message: `Succes add todo`, todo: newTodo });
          todolist.push(newTodo);

          console.log(newTodo);
        } catch (err) {
          sendJSON(res, 400, { message: `Invalid JSON` });
          console.error(err);
        }
      });
      break;

    case "/api/todo/update":
      if (validationMethod(req, "PUT")) {
        sendJSON(res, 401, { message: `Invalid method` });
        return;
      }
      if (validationData(req, "application/json")) {
        sendJSON(res, 400, { message: `Invalid data format` });
        return;
      }

      const idFromQuery = parseInt(queryParam.get("id"));

      const findIdIndex = todolist.findIndex((arr) => {
        return arr.id === idFromQuery;
      });

      if (findIdIndex === -1) {
        sendJSON(res, 404, { message: `Todo not found` });
        return;
      }

      let chunkUpdate = [];

      req.on("data", (chunk) => {
        chunkUpdate.push(chunk);
      });

      req.on("end", () => {
        try {
          const concatBuffer = Buffer.concat(chunkUpdate);
          const parsedBuffer = JSON.parse(concatBuffer.toString());

          const { todo, completed } = parsedBuffer;

          if (typeof todo !== "string" || typeof completed !== "boolean") {
            sendJSON(res, 400, {
              message: `Todo must string and Completed must boolean`,
            });
            return;
          }

          todolist[findIdIndex].todo = todo;
          todolist[findIdIndex].completed = completed;

          sendJSON(res, 200, todolist[findIdIndex]);
          console.log(todolist);
        } catch (err) {
          sendJSON(res, 400, { message: `Invalid JSON` });
          console.error(err);
        }
      });
      break;

    case "/api/todo/delete":
      if (validationMethod(req, "DELETE")) {
        sendJSON(res, 401, { message: `Invalid method` });
        return;
      }

      if (todolist.length === 0) {
        sendJSON(res, 404, { message: "Empty data" });
        return;
      }
      const idToDelete = parseInt(queryParam.get("id"));

      const findIndexToDelete = todolist.findIndex((arr) => {
        return arr.id === idToDelete;
      });

      if (findIndexToDelete === -1) {
        sendJSON(res, 404, { message: `Todo not found` });
        return;
      }

      todolist.splice(findIndexToDelete, 1);
      sendJSON(res, 200, todolist);
      break;

    default:
      sendJSON(res, 404, { message: `PAGE NOT FOUND` });
      break;
  }
});

server.listen(PORT, () => {
  console.info(`SERVER RUNNING ON PORT => ${PORT}`);
});
