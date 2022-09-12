const server = require("./app/server");
require("dotenv").config();

new server(process.env.PORT, process.env.DB_URL)