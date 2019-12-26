require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const pinCodeRouter = require("./src/routers/getPinCode");

/**
 * Creates an instance of the express server
 */
const app = express();
app.use(bodyParser.json());
const server = app.listen(process.env.PORT, () => {
  console.log("Server running in port: ", server.address().port);
});

// configure the router
app.use("/GetPinCode", pinCodeRouter);
