const account = [
    { username: "admin", password: "Admin123" },
    { username: "toto", password: "toto123"}
];

let login = { username: "admimya", password: "Adm3" };
const test = account.find((acc) => {
    return acc.username === login.username && acc.password === login.password
});


test.username = "adminyazid";

console.log(test);
console.log(account);
