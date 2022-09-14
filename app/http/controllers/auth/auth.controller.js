const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/users.models");
const { HashString, CompareDataWithHash } = require("../../../utils/functions");
const { SignToken } = require("../../../utils/jwt");
const ControllerBase = require("../controllerBase");

class AuthController extends ControllerBase {
    async signup(req, res, next) {
        try {
            const { username, password, firstName, lastName } = req.body;
            
            await this.CheckUsernameExistence(username)

            const signupResult = await UserModel.create({ 
                username,
                password: HashString(password),
                firstName: firstName ?? undefined,
                lastName: lastName ?? undefined
            })
            
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
        try {
            const { username, password } = req.body; // Receiving Info from request
            // Finding by Username
            const user = await UserModel.findOne({ username });
            if (!user) throw createHttpError.NotFound("Username or password is Incorrect")
            if (!CompareDataWithHash(password, user.password)) throw createHttpError.Unauthorized("Username or password is incorrect")
            // Token Saving
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
        } catch (error) {
            next(error)
        }
    }

    async CheckUsernameExistence(username) {
        const user = await UserModel.findOne({ username });
        if (user) throw createHttpError.BadRequest("Username is already taken")
        return
    }
}

module.exports = {
    AuthController: new AuthController(),
}
