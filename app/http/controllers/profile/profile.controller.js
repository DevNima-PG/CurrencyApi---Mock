const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users.models");
const ControllerBase = require("../controllerBase");
class ProfileController extends ControllerBase {
    async GetProfile(req, res, next) {
        try {
            const user = req.user;
            const reqUser = await this.FindUser(user.username)
            return res.status(200).json(reqUser);
        } catch (error) {
            next(error)
        }
    }

    async EditProfile(req, res, next) {
        try {
            const { firstName, lastName, username } = req.body;
            username ?? await this.FindUser(username)
            const UpdateResult = await UserModel.updateOne({ _id: req.user._id }, { $set: { firstName, lastName, username }});
            if (!UpdateResult.modifiedCount) throw createHttpError.InternalServerError("Your profile was not updated, try in a few moments")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Your profile was updated successfully! 🎉🎉🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async DeleteProfile(req, res, next) {
        try {
            const user = req.user;
            const DeleteResult = await UserModel.deleteOne({ _id: user._id })
            if (!DeleteResult.deletedCount) throw createHttpError.InternalServerError("Your account was not deleted")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Your Account was deleted successfully! 🎉 Come Back Soon"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async FindUser(username) {
        const user = UserModel.findOne({ username });
        if (!user) throw createHttpError.NotFound("Can't find that user")
        return user;
    }
}

module.exports = {
    ProfileController: new ProfileController(),
}
