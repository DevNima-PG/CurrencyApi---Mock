const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users.models");
const { HashString, CompareDataWithHash } = require("../../../utils/functions");
const { SignToken } = require("../../../utils/jwt");
const ControllerBase = require("../controllerBase");

class AuthController extends ControllerBase {
    async signup(req, res, next) {
        try {
            const { username, password, firstName, lastName } = req.body;
            const signupResult = await UserModel.create({ username, password: HashString(password), firstName, lastName })
            if (!signupResult) throw createHttpError.InternalServerError("Sorry! we can't create your account now! please try again in a few moments")
            return res.status(201).json({
                status: 201,
                success: true,
                data: {
                    message: "Your Account was created Successfully! 🎉🎉"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async Login(req, res, next) {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) throw createHttpError.NotFound("Username or password is Incorrect")
        if (!CompareDataWithHash(password, user.password)) throw createHttpError.Unauthorized("Username or password is incorrect")
        const token = SignToken(user);
        user.token = token;
        await user.save();
        return res.status(200).json({
            status: 200,
            success: true,
            data: {
                message: "you were logged in successfully! 🎉🎉"
            }
        })
    }
}

module.exports = {
    AuthController: new AuthController(),
}
