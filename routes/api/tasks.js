const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const Task = require("../../models/Task");
const TaskType = require("../../models/TaskType");
const auth = require("../../middleware/auth");

var isDate = function(date) {
  var date = Date.parse(date);
  if (isNaN(date)) {
    return false;
  } else {
    return true;
  }
};

// @route   GET api/tasks
// @desc    Get all users tasks
// @access  private
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ user: userId }).populate("taskType");

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/tasks
// @desc    Add new task
// @access  private
router.post(
  "/",
  [
    check("from", "Please include valid from Date").custom(value => {
      return isDate(value);
    }),
    check("to", "Please include valid to Date")
      .optional()
      .custom(value => {
        return isDate(value);
      }),
    check("description", "Please include description")
      .not()
      .isEmpty(),
    check("taskType", "Please include taskTypeId").custom(value => {
      return TaskType.findById(value).then(type => {
        if (!type) {
          return Promise.reject("Task Type doesnt exist.");
        }
      });
    }),
    check("active", "Active true or false")
      .optional()
      .isIn(["true", "false"]),
    auth
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = req.user.id;
      const { description, from, taskType, to, active } = req.body;
      if (to) {
        if (Date.parse(to) < Date.parse(from)) {
          return res.status(400).json({ msg: "to date is > than from" });
        }
      }
      const newTask = new Task({
        user: userId,
        description,
        from,
        to,
        active,
        taskType
      });
      await newTask.save();
      res.status(200).json(newTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({
      user: userId,
      _id: req.params.id
    }).populate("taskType");

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
