const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { compare } = require("bcrypt");

config();

const ApiError = require("../error/ApiError.js");
const {
    User,
} = require("../models/index");

const generateJwt = (id, login, tutor) => {
    return jwt.sign({ id, login, tutor }, process.env.SECRET_KEY, {
        expiresIn: "60d",
    });
};

const getDecodedToken = (token) => {
    return jwt.decode(token);
};

class UserController {
    async logIn(req, res, next) {
        const { login, password } = req.body;

        try {
            User.findOne(
                {
                    login: login,
                },
                async function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        return res.status(401).json({
                            message: "Пользователь не найден",
                        });
                    }

                    const validPassword = await compare(
                        password,
                        user.password
                    );
                    if (validPassword) {
                        return res.json({
                            token: generateJwt(
                                user._id,
                                user.login,
                            ),
                        });
                    } else {
                        res.status(400).json({
                            error: "Неправильный логин или пароль",
                        });
                    }
                }
            );
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Что-то пошло не так", e));
        }
    }

    async check(req, res, next) {
        const { token } = req.body;

        try {
            const { id, login } = getDecodedToken(token);

            User.findOne(
                {
                    _id: id,
                    login: login,
                },
                function (err, user) {
                    if (err) throw err;
                    if (!user) {
                        return res.status(200).json({
                            auth: false,
                        });
                    } else {
                        return res.status(200).json({
                            auth: true,
                            id: id,
                        });
                    }
                }
            );
        } catch (e) {
            return res.status(200).json({
                auth: false,
            });
        }
    }

    async getUserInfo(req, res, next) {
        const { token } = req.body;
        const { id } = getDecodedToken(token);

        try {
            User.findOne({ _id: id }, async function (err, user) {
                if (err) throw err;
                if (!user) {
                    return res.status(401).json({
                        message: "Пользователь не найден!",
                    });
                }


                const result = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                };

                return res.json(result);
            });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }
}

module.exports = new UserController();
