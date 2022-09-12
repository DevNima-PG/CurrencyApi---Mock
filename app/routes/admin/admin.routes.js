const adminRouter = require("express").Router();

adminRouter.get("/") // see panel
adminRouter.get("/users") // see all users
adminRouter.delete("/user/:id")

module.exports = {
    AdminRouter: adminRouter
}
