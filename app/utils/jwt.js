const jwt = require("jsonwebtoken");
require("dotenv").config();

function SignToken(user) {
    const { username } = user;

    let options = {
        expiresIn: "24h"
    };

    const token = jwt.sign({username}, process.env.JWT_ACCESTOKEN_SECRET, options)
    return token;
}

module.exports = {
    SignToken
}
