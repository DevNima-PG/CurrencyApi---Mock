const { genSaltSync, hashSync } = require("bcrypt")

const HashString = rawData => {
    const salt = genSaltSync(13);
    return hashSync(rawData, salt)
}

module.exports = {
    HashString,
}
