const { body } = require("express-validator");

function signupValidator() {
    return [
        body("username").trim().notEmpty().withMessage("Username is required").isString().withMessage("Input username is not correct"),
        body("password").isString().withMessage("Input password is not correct").trim().notEmpty().withMessage("Password must not be empty"),
        body("firstName").optional().trim().isString().withMessage("Firstname is not correct"),
        body("lastName").optional().trim().isString().withMessage("Lastname is not correct")
    ]
}

function LoginValidator() {
    return [
        body("username").trim().notEmpty().withMessage("Username is required").isString().withMessage("Input username is not correct"),
        body("password").isString().withMessage("Input password is not correct").trim().notEmpty().withMessage("Password must not be empty"),
    ]
}

module.exports = {
    signupValidator,
    LoginValidator,
}
