const express = require("express");
const connectDB = require("./config/db");
const populate = require("./populate/taskTypes");

const app = express();
connectDB();

app.use(
  express.json({
    extended: false
  })
);

app.get("/", (req, res) => res.send("API running"));

app.use("/api/user", require("./routes/api/user"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

populate();
