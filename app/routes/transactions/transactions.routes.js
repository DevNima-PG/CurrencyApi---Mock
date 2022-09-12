const transactionRouter = require("express").Router();

transactionRouter.get("/") // user can see all his transactions || req.user midlleware should be written
transactionRouter.post("/create") // Send amount of money to someone

module.exports = {
    TransactionRouter: transactionRouter
}
