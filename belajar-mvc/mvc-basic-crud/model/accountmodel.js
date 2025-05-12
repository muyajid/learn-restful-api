import { data } from "../db.js";

function showAccount() {
  return data;
}

function addAccount(account) {
  data.push(account);
}

function putAccount(username, password, newUsername, newPassword) {
  const account = data.findIndex((arr) => {
    return arr.username === username && arr.password === password;
  });

  if (account !== -1) {
    data[account].username = newUsername;
    data[account].password = newPassword;
    return true;
  }

  return false;
}

function dropAccount(username, password) {
  const findAccount = data.findIndex((arr) => {
    return arr.username === username && arr.password === password;
  });

  if (findAccount !== -1) {
    data.splice(findAccount, 1);
    return true;
  }

  return false;
}

export { showAccount, addAccount, putAccount, dropAccount };
