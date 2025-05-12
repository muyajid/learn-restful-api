import { showAccount, addAccount, putAccount, dropAccount } from "../model/accountmodel.js";
import {
  sendServerResponShowAccount,
  sendServerResponCreateStatus,
  sendServerResponErr,
  sendServerResponNotFound,
  sendServerResponUpdate,
  sendServerResponDelete,
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
      const concatData = Buffer.concat(chunksArrAccount);
      const parsedData = JSON.parse(concatData.toString());

      const { username, password } = parsedData;

      if (!username || !password) {
        sendServerResponErr(res, 400, "Bad request");
        return;
      }

      const findDuplicate = showAccount().find((acc) => {
        return acc.username === username && acc.password === password;
      });

      if (findDuplicate) {
        sendServerResponErr(res, 409, "Account has ben registered");
        return;
      }

      const accountToPush = {
        id: defaultId++,
        username: username,
        password: password,
      };

      addAccount(accountToPush);
      sendServerResponCreateStatus(res, "Succesfully add account");
      console.log(showAccount());
    } catch (err) {
      sendServerResponErr(res, 505, "Internal server eror");
    }
  });
}

function updateAccount(req, res) {
  if (req.method !== "PUT") {
    sendServerResponErr(res, 401, "Invalid method");
    return;
  }

  let chunksArrUpdate = [];

  req.on("data", (chunk) => {
    chunksArrUpdate.push(chunk);
  });

  req.on("end", () => {
    try {
      const concatBuffer = Buffer.concat(chunksArrUpdate);
      const parsedBuffer = JSON.parse(concatBuffer.toString());

      const { username, password, newUsername, newPassword } = parsedBuffer;

      if (!username || !password || !newUsername || !newPassword) {
        sendServerResponErr(res, 400, "Invalid data");
        return;
      }

      const results = putAccount(username, password, newUsername, newPassword);
      if (!results) {
        sendServerResponUpdate(res, 404, "Account not found");
      } else {
        sendServerResponUpdate(res, 200, "Account succesfully update");
      }
    } catch (err) {
      sendServerResponErr(res, 505, "Internal server eror");
    }
  });
}

function deleteAccount(req, res) {
  if (req.method !== "DELETE") {
    sendServerResponErr(res, 401, "Invalid method");
    return;
  }

  let chunksArrDelete = [];

  req.on("data", (chunk) => {
    chunksArrDelete.push(chunk);
  });

  req.on("end", () => {
    try {
      const concatBuffer = Buffer.concat(chunksArrDelete);
      const parsedBuffer = JSON.parse(concatBuffer.toString());

      const { username, password, drop } = parsedBuffer;

      if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        typeof drop !== "boolean"
      ) {

        sendServerResponErr(res, 400, "Bad request");
        return;
      };

      if (drop === true) {
        const results = dropAccount(username, password);
        if (results === false) {
          sendServerResponDelete(res, 404, "Account not found");
        } else {
          sendServerResponDelete(res, 200, "Succesfully delete");
          console.log(showAccount());
          
        };
      }
    } catch (err) {
      sendServerResponErr(res, 505, "Internal server eror");
    }
  });
}

export { getAccount, postAccount, updateAccount, deleteAccount };
