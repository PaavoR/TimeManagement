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
app.use("/api/tasks", require("./routes/api/tasks"));
app.use("/api/tasktypes", require("./routes/api/tasktypes"));

const PORT = process.env.APP_SERVER_PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

populate();
