const TaskType = require("../models/TaskType");
const data = require("./tasktypes.json");

const populate = async () => {
  data.map(async a => {
    try {
      let old = await TaskType.findOne(a);
      if (!old) {
        const taskType = new TaskType(a);
        await taskType.save();
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = populate;
