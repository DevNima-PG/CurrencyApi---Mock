const express = require("express");

class Application {
    #PORT;
    #DB_URL;
    #app = express();
    constructor() {

    }

    CreateServer() {
        const http = require("http")
        http.createServer(this.#app)
    }
}