import { data } from "../db.js";

function showAccount() {
    return data;
}

function addAccount(account) {
    data.push(account);
}

export { showAccount, addAccount };