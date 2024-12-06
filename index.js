const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3010;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/users"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${
      req.url
    } with method [ ${req.method.toUpperCase()} ] is not found in this server`,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
