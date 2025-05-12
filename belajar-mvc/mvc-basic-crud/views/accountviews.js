function sendServerResponShowAccount(res, account) {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify(account));
}
function sendServerResponCreateStatus(res, message) {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: message }));
}
function sendServerResponErr(res, statusCode, message) {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: message }));
}
function sendServerResponNotFound(res, message) {
  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: message }));
}

export {
  sendServerResponShowAccount,
  sendServerResponCreateStatus,
  sendServerResponErr,
  sendServerResponNotFound,
};
