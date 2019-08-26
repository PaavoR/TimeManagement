const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const TaskType = require("../../models/TaskType");

// @route   GET api/tasktypes
// @desc    Get all tasktypes
// @access  private
router.get("/", auth, async (req, res) => {
  try {
    const taskTypes = await TaskType.find({});
    res.json(taskTypes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
