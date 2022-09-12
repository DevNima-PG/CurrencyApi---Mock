const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/users.models");
require("dotenv").config();

const GetTokenFromHeaders = async (headers) => {
    const token = await headers?.authorization?.split(" ")[1] || [];
    if (token) return token;
    throw createHttpError.Unauthorized("please Login first! 🐢 ")
}

async function VerifyTokenAndSetUser(req, res, next) {
    try {
        const token = await GetTokenFromHeaders(req.headers).then(token => token);
        jwt.verify(token, JWT_ACCESTOKEN_SECRET, async (err, payload) => {
            try {
                if (err) throw createHttpError.Unauthorized("Login to your account! 🐢");
                const { username } = payload || {};
                const user = await UserModel.findOne(
                    { username },
                    { password: 0, otp: 0 }
                );
                if (!user) throw createHttpError.Unauthorized("Account was not found! 🐢");
                req.user = user;
                return next();
            } catch (error) {
                next(error);
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    VerifyTokenAndSetUser
}
