const http = require('http');

function sendJSON(res, statusCode, message) {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(message));
  return;
}

function validationJSON(req, res, message) {
  if (req.headers['content-type'] !== "application/json") {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify(message));
    return true;
  }
  return false;
};

const account = [];
const VALID_API_KEY = "";
const PORT = 3000;

const server = http.createServer(function handler(req, res) {

  const path = req.url;
  const method = req.method;
  const reqHeaders = req.headers['api-key'];

  switch (path) {

    // C
    case '/create':

      if (method !== 'POST') {
        sendJSON(res, 405, { message: `Method not allowed`});
        return;
      }
      // Validatiion data from client
      if(validationJSON(req, res, { message: "Invalid data format" })) { return; };

      // arr for collect pieces of data
      let chunksArrCreate = [];
      
      // listener for pieces of data
      req.on("data", (chunk) => { chunksArrCreate.push(chunk) });

      // listener for when data has been colacted
      req.on("end", () => {
        try {
          // combine pieces of data into one complete data
          const concatData = Buffer.concat(chunksArrCreate);
          const parsedData = JSON.parse(concatData.toString());

          if (!parsedData.username || !parsedData.password) {
            sendJSON(res, 400, { message: `Invalid data`});
            return;
          }

          const existData = account.find((acc) => {
            return acc.username === parsedData.username && acc.password === parsedData.password;
          });

          if (existData) {
            sendJSON(res, 409, { message: `account is already registered` });
            return;
          }

          account.push(parsedData);
          console.log(account);
          sendJSON(res, 200, { message: `account has been successfully registered` });
        } catch (error) {
          sendJSON(res, 400, { message: `Invalid JSON`})
        }
      });

      break;

      case '/login':

        if (method !== 'POST') {
          sendJSON(res, 405, { message: `Invalid method` });
          return;          
        }

        if (validationJSON(req, res, { message: `Invalid data format`})) { return };

        let chunksArrLogin = [];

        req.on("data", (chunk) => { chunksArrLogin.push(chunk) });

        req.on("end", () => {
          try {
            const concatData = Buffer.concat(chunksArrLogin);
            const parsedData = JSON.parse(concatData.toString());

            const { username, password } = parsedData;

            if (!username || !password) {
              sendJSON(res, 400, { message: `Invalid login data` });
              return;             
            }

            const existDataAccount = account.find((acc) => {
              return acc.username === username && acc.password === password;
            });

            if (existDataAccount) {
              sendJSON(res, 200, { message: `Sucesfully Login` });
            } else {
              sendJSON(res, 401, { message: `Login Unsucesfull` });
              
            }
          } catch (error) {
            sendJSON(res, 400, { message: `Invalid JSON` });
          }
        })
        break;
        // U
        case '/update':

          if (method !== 'PUT' && reqHeaders !== VALID_API_KEY) {
            sendJSON(res, 405, { message: `Invalid method or api-key` })  
            return;          
          }

          if (validationJSON(req, res, { message: `Invalid data format` })) { return; }

          let chunksArrUpdate = [];

          req.on("data", (chunk) => { chunksArrUpdate.push(chunk) });

          req.on("end", () => {
            try {
              const concatData = Buffer.concat(chunksArrUpdate);
              const parsedData = JSON.parse(concatData.toString());

              const { username, password, newUsername, newPassword } = parsedData;

              if (!username || !password || !newUsername || !newPassword) {
                sendJSON(res, 400, { message: `Invalid update data` });
                return;
              }

              const existDataToUpdate = account.find((acc) => {
                return acc.username === username && acc.password === password;
              });

              if (existDataToUpdate) {

                existDataToUpdate.username = newUsername;
                existDataToUpdate.password = newPassword;
                sendJSON(res, 200, { message: `Succesfuly update account`});
                console.log(account);

              } else {
                sendJSON(res, 404, { message: `Unsuccesful update account chek username and password` });
              }
            } catch (error) {
              sendJSON(res, 400, { message: `Invalid JSON` });
            }
          })
          break;

          // R
          case '/show':

            if (method !== 'GET' || reqHeaders !== VALID_API_KEY) {
              sendJSON(res, 405, { message: `Invalid method or api-key` });
              return;
            }

            if (account.length === 0) {
              sendJSON(res, 404, { message: `No data available` });
              return;
            }

            sendJSON(res, 200, { message: `Account list data`, data: account });
            console.log(account);
            break;
            // D
            case '/delete':
              if (method !== 'DELETE' || reqHeaders !== VALID_API_KEY) {
                sendJSON(res, 405, { message: `Invalid method or api-key` });
                return;
              }

              if (account.length === 0) {
                sendJSON(res, 404, { message: `No data available` });
                return;
              }

              let chunksArrDelete = [];

              req.on("data", (chunk) => { chunksArrDelete.push(chunk) });

              req.on("end", () => {
                try {
                  const concatData = Buffer.concat(chunksArrDelete);
                  const parsedData = JSON.parse(concatData.toString());

                  const { username, password } = parsedData;

                  if (!username || !password) {
                    sendJSON(res, 400, { message: `account deletion requirements are not met`});
                  }

                  const findIndex = account.findIndex((acc) => {
                    return acc.username === username && acc.password === password;
                  })

                  if (findIndex === -1) {
                    sendJSON(res, 404, { message: `Account not found` });
                  } else {
                    account.splice(findIndex, 1);
                    sendJSON(res, 200, { message: `Account successfully deleted` });
                    console.log(account, `length => ${account.length}`);
                    
                  }
                } catch(err) {
                  sendJSON(res, 400, { message: `Invalid JSON`});
                }
              })
              break;

  
    default:
      sendJSON(res, 404, { message: `PAGE NOT FOUND`});
      break;
  }
});

server.listen(PORT, () => {
  console.info(`|| SERVER RUNNING ON => http://localhost:${PORT}`);
})
// -- Muhammad Yazid Arsy
