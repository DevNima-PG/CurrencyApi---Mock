const { genSaltSync, hashSync, compareSync } = require("bcrypt")

const HashString = rawData => {
    const salt = genSaltSync(13);
    return hashSync(rawData, salt)
}

const CompareDataWithHash = (rawData, HashedData) => {
    return compareSync(rawData, HashedData)
}

module.exports = {
    HashString,
    CompareDataWithHash
}
