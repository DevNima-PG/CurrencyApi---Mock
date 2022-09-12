const authRouter = require("express").Router();

authRouter.get("/signup");
authRouter.get("/login");
authRouter.get("/forgotPassword")

module.exports = {
    AuthRouter: authRouter
}
