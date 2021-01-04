const express = require("express");
const app = express();
const port = 3000;
// const bodyParser = require("body-parser");

const usersRouter = require("./routes/users");

// middleware setup
app.use(express.json());
app.use("/users", usersRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
