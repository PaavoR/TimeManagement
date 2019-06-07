const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  taskType: {
    type: Schema.Types.ObjectId,
    ref: "tasktype"
  },
  description: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = Profile = mongoose.model("task", TaskSchema);
