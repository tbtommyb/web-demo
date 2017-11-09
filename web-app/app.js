const connect = require("connect");
const path = require("path");
const serveStatic = require("serve-static");

const PORT = 9000;
const DIR = __dirname;

connect().use(serveStatic(DIR)).listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});
