const { VerifyTokenAndSetUser } = require("../http/middlewares/VerifyAccessToken");
const { AdminRouter } = require("./admin/admin.routes");
const { AuthRouter } = require("./auth/auth.routes");
const { TransactionRouter } = require("./transactions/transactions.routes");
const { ProfileRouter } = require("./profile/profile.routes");

const MainRouter = require("express").Router();

MainRouter.get("/", (req, res, next) => {
    console.log("SomeOne Visited :)))")
    res.send("سلام کنجکاو، به کنجکاویت ادامه بده ولی خیلی دست نزن به چیزی")
})

MainRouter.use("/auth", AuthRouter)
MainRouter.use("/profile", VerifyTokenAndSetUser, ProfileRouter)
MainRouter.use("/transactions", VerifyTokenAndSetUser, TransactionRouter)
MainRouter.use("/admin", AdminRouter)

module.exports = {
    MainRouter
}