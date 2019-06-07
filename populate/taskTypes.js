const TaskType = require("../models/TaskType");
const data = require("./tasktypes.json");

const populate = () => {
  data.map(a => {
    try {
      const taskType = new TaskType(a);
      taskType.save();
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = populate;
