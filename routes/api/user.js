const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");
const Task = require("../../models/Task");
const auth = require("../../middleware/auth");

// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check("password", "Please enter password with 6 or more chars").isLength({
      min: 5
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      // See if the user exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      const hashpassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashpassword
      });

      await user.save();

      //Jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "6h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  }
);

// @route   POST api/user/login
// @desc    login a user
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please include valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  }
);

// @route   GET api/user
// @desc    get user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/user/delete
// @desc    login a user
// @access  Public
router.delete("/delete", auth, async (req, res) => {
  try {
    const deleted = await User.deleteOne({ _id: req.user.id });
    await Task.deleteMany({ user: req.user.id });
    if (deleted.deletedCount == 1) {
      return res.status(200).json({ msg: "user deleted" });
    } else if (deleted.deletedCount == 0) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      return res.status(404).json({ msg: "something went wrong" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT api/user/changepassword
// @desc    change user password
// @access  Private
router.put(
  "/changepassword",
  [
    check("old_password", "Please include old password").exists(),
    check("old_password2", "Please include old password 2").exists(),
    check(
      "new_password",
      "Please enter password with 6 or more chars"
    ).isLength({
      min: 5
    }),
    auth
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { old_password, old_password2, new_password } = req.body;
    if (old_password !== old_password2) {
      return res.status(400).json({ msg: "Old passwords dont match" });
    }
    let user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Old passwords dont match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(new_password, salt);
    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { password: hashpassword } }
    );

    return res.status(200).json(user);
  }
);

module.exports = router;
