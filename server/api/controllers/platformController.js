const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const { compare } = require("bcrypt");

config();

const ApiError = require("../error/ApiError.js");
const {
    User,
    Tasks,
    HardLvlTasks
} = require("../models/index");

const generateJwt = (id, login, tutor) => {
    return jwt.sign({ id, login, tutor }, process.env.SECRET_KEY, {
        expiresIn: "60d",
    });
};

const getDecodedToken = (token) => {
    return jwt.decode(token);
};

class PlatformController {
    async getTasks(req, res, next) {
        const { token } = req.body;
        const { id } = getDecodedToken(token);

        try {
            Tasks.find({ User: id }, async function (err, tasks) {
                const result = {};
                
                console.log(tasks)

                tasks.map((task)=>{
                    if (task.status in result) {
                        result[task.status].push(task);
                    } else {
                        result[task.status] = []
                        result[task.status].push(task);
                    }
                })
                
                console.log(result)
                return res.json(result);
            });
        } catch (e) {
            console.log(e);
            return next(ApiError.internal("Ошибка!", e));
        }
    }
}

module.exports = new PlatformController();
