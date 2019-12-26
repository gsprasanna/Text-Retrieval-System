const express = require("express");
const pinCodeRouter = express.Router();
const { PhoneBook } = require("../models/PhoneBook"); // destructuring the function

/*
  POST request
  Route will fetch pincode for the given phone number.
*/
pinCodeRouter.route("/").post((req, res) => {
  debugger;
  const { phoneNumber } = req.body;
  const user = PhoneBook.findOne({
    where: {
      phoneNumber
    },
    order: [["createdAt", "DESC"]]
  })
    .then(response => {
      res.status(200).json({ PinCode: response.pinCode });
    })
    .catch(error =>
      res
        .status(400)
        .json({
          error: "Pincode not found! Please enter valid number.." + error
        })
    );
});

module.exports = pinCodeRouter;
