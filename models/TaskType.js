const mongoose = require('mongoose');

const TaskTypeShcema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = TaskType = mongoose.model('tasktype', TaskTypeShcema);