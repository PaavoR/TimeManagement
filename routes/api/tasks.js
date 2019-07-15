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
router.get(
  "/",
  [
    auth,
    check("from", "Please include valid from Date")
      .custom(value => {
        return isDate(value);
      })
      .optional(),
    check("to", "Please include valid to Date")
      .custom(value => {
        return isDate(value);
      })
      .optional()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { from, to } = req.body;

      const userId = req.user.id;
      if (from && to) {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        if (from > to) {
          return res.status(400).json({ msg: "from date is > than to" });
        }
        const tasks = await Task.find({
          from: { $gte: fromDate, $lt: toDate },
          user: userId
        }).populate("taskType");
        return res.status(200).json(tasks);
      } else if (from) {
        const fromDate = new Date(from);
        const tasks = await Task.find({
          from: { $gte: fromDate },
          user: userId
        }).populate("taskType");
        return res.status(200).json(tasks);
      } else if (to) {
        const toDate = new Date(to);
        const tasks = await Task.find({
          from: { $lt: toDate },
          user: userId
        }).populate("taskType");
        return res.status(200).json(tasks);
      } else {
        const tasks = await Task.find({ user: userId }).populate("taskType");
        return res.status(200).json(tasks);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

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
          return res
            .status(400)
            .json({ errors: [{ msg: "to date is > than from" }] });
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

// @route   GET api/tasks/:id
// @desc    Get a task
// @access  private
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

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  private
router.delete("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: userId
    });
    if (!task) {
      return res.status(400).json({ msg: "Task not found for this user" });
    }
    res.status(200).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/tasks/:id
// @desc    Modify task
// @access  private
router.put(
  "/:id",
  [
    check("from", "Please include valid from Date")
      .optional()
      .custom(value => {
        return isDate(value);
      }),
    check("to", "Please include valid to Date")
      .optional()
      .custom(value => {
        return isDate(value);
      }),
    check("description", "Please include description")
      .not()
      .isEmpty()
      .optional(),
    check("taskType", "Please include taskTypeId")
      .custom(value => {
        return TaskType.findById(value).then(type => {
          if (!type) {
            return Promise.reject("Task Type doesnt exist.");
          }
        });
      })
      .optional(),
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
      const oldValues = await Task.findOne({
        user: userId,
        _id: req.params.id
      });
      if (!oldValues) {
        return res.status(400).json({ msg: "Task not found for this user" });
      }
      if (to && from) {
        if (Date.parse(to) < Date.parse(from)) {
          return res
            .status(400)
            .json({ errors: [{ msg: "to date is > than from" }] });
        }
      } else if (to && oldValues.from) {
        if (Date.parse(to) < Date.parse(oldValues.from)) {
          return res
            .status(400)
            .json({ errors: [{ msg: "to date is > than from" }] });
        }
      } else if (from && oldValues.to) {
        if (Date.parse(oldValues.to) < Date.parse(from)) {
          return res
            .status(400)
            .json({ errors: [{ msg: "to date is > than from" }] });
        }
      }
      if (description) oldValues.description = description;
      if (from) oldValues.from = from;
      if (taskType) oldValues.taskType = taskType;
      if (to) oldValues.to = to;
      if (active) oldValues.active = active;
      oldValues.save();
      return res.status(200).json(oldValues);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
