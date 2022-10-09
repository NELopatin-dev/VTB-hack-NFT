const mongoose = require('mongoose');
const { Schema, model, Types } = require("mongoose");

const HardLvlTasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    koef: {
        type: Number, 
        required: true
    },
})


module.exports = mongoose.model('HardLvlTasks', HardLvlTasksSchema)