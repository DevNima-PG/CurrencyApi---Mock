const { Schema, Types, model } = require("mongoose")

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    token: { type: String },
    currentBalance: { type: String, required: true, default: "0" },
    transactions: { type: [Types.ObjectId] }
})

const UserModel = model("users", UserSchema)

module.exports = {
    UserModel
}
