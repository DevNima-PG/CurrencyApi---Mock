const { Schema, Types, model } = require("mongoose")

const UserSchema = new Schema({

})

const UserModel = model("users", UserSchema)

module.exports = {
    UserModel
}
