import { showAccount, addAccount } from "../model/accountmodel.js";
import {
  sendServerResponShowAccount,
  sendServerResponCreateStatus,
  sendServerResponErr,
  sendServerResponNotFound,
} from "../views/accountviews.js";

function getAccount(req, res) {
  if (req.method !== "GET") {
    sendServerResponErr(res, 401, "Invalid method");
    return;
  }

  try {
    if (showAccount().length === 0) {
      sendServerResponNotFound(res, "Data empty");
      return;
    }
    sendServerResponShowAccount(res, showAccount());
  } catch (error) {
    sendServerResponErr(res, 505, "Internal server eror");
  }
}
let defaultId = 6;
function postAccount(req, res) {

  if (req.method !== "POST") {
    sendServerResponErr(res, 401, "Invalid method");
    return;
  }

  let chunksArrAccount = [];

  req.on("data", (chunk) => {
    chunksArrAccount.push(chunk);
  });

  req.on("end", () => {
    try {
      const concatData = Buffer.concat(chunksArrAccount)
      const parsedData = JSON.parse(concatData.toString());

      const { username, password } = parsedData;

      if (!username || !password) {
        sendServerResponErr(res, 400, "Bad request" );
        return;
      }

      const findDuplicate = showAccount().find((acc) => {
        return acc.username === username && acc.password === password;
      });

      if (findDuplicate) {
        sendServerResponErr(res, 409, "Account has ben registered" );
        return;
      }

      const accountToPush = {
        id: defaultId++,
        username: username,
        password: password
      };

      addAccount(accountToPush);
      sendServerResponCreateStatus(res, "Succesfully add account");
      console.log(showAccount());
      
    } catch (err) {
      sendServerResponErr(res, 505, "Internal server eror");
    }
  })
}

export { getAccount, postAccount };
