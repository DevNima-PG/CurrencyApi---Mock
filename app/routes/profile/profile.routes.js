const { ProfileController } = require("../../http/controllers/profile/profile.controller");

const profileRouter = require("express").Router();

profileRouter.get("/", ProfileController.GetProfile)
profileRouter.patch("/edit", ProfileController.EditProfile)
profileRouter.delete("/delete-account", ProfileController.DeleteProfile)

module.exports = {
    ProfileRouter: profileRouter
}
