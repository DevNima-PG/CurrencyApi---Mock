const { AuthController } = require("../../http/controllers/auth/auth.controller");
const { ValidationErrorMapper } = require("../../http/middlewares/validationErrorsMapper");
const { VerifyTokenAndSetUser } = require("../../http/middlewares/VerifyAccessToken");
const { signupValidator, LoginValidator } = require("../../http/validators/auth/auth.validator");

const authRouter = require("express").Router();

authRouter.get("/signup", signupValidator(), ValidationErrorMapper, AuthController.signup);
authRouter.get("/login", LoginValidator(), ValidationErrorMapper, VerifyTokenAndSetUser, AuthController.Login);
authRouter.get("/forgotPassword")

module.exports = {
    AuthRouter: authRouter
}
