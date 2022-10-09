const mongoose = require('mongoose');
const { Schema, model, Types } = require("mongoose");
const hardLvlTask = require('./hardLvlTask');

const TasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    status: {
        type: String,
    },
    hardlevel: {
        type: Types.ObjectId,
        ref: "HardLvlTasks",
    },
    sum: {
        type: Number,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
})

TasksSchema.pre("save", async function (next) {
    try {
        const hardlevel = await hardLvlTask.findOne({
            _id: this.hardlevel
        })

        this.sum = hardlevel.koef * 100
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model('Tasks', TasksSchema)