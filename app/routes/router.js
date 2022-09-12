const { VerifyTokenAndSetUser } = require("../http/middlewares/VerifyAccessToken");
const { AdminRouter } = require("./admin/admin.routes");
const { AuthRouter } = require("./auth/auth.routes");
const { TransactionRouter } = require("./transactions/transactions.routes");
const { UserRouter } = require("./users/user.routes");

const MainRouter = require("express").Router();

MainRouter.get("/", (req, res, next) => {
    console.log("SomeOne Visited :)))")
    res.send("سلام کنجکاو، به کنجکاویت ادامه بده ولی خیلی دست نزن به چیزی")
})

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/user", VerifyTokenAndSetUser, UserRouter)
MainRouter.use("/transactions", VerifyTokenAndSetUser, TransactionRouter)
MainRouter.use("/admin", AdminRouter)

module.exports = {
    MainRouter
}