/*
  Importing required packages
*/
const Sequelize = require("sequelize"); // Sequelize - ORM for nodejs
const PhoneBookDB = require("../config/PhoneBookDB");
const fs = require("fs"); // fs module allows you to work with the file system
const eventStream = require("event-stream");

const arr = [];

/*
  Reading the flat file in stream
  Push each line to array
*/
fs.createReadStream("./src/resources/phoneBook.txt")
  .pipe(eventStream.split())
  .pipe(
    eventStream.map(item => {
      arr.push(item);
    })
  );

/*
  modeling the schema/table for phone book model.
*/
const PhoneBook = PhoneBookDB.define("phonebook", {
  phoneNumber: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  pinCode: Sequelize.INTEGER
});

/*
  Synchronizing the model with the database
*/
const PhoneBookSync = ({ force = false } = { force: false }) => {
  PhoneBook.sync({ force })
    .then(() => {
      arr.map(item => {
        const testPhoneDetail = {
          phoneNumber: item.split(",")[0],
          name: item.split(",")[1],
          address: item.split(",")[2],
          city: item.split(",")[3],
          pinCode: item.split(",")[4]
        };
        PhoneBook.create(testPhoneDetail)
          .then(result => {
            console.log(":::::::::::::: Welcome!::::::::::::::");
            console.log(result.get());
          })
          .catch(console.error);
      });
    })

    .catch(console.error);
};

//exporting the functions
exports.PhoneBook = PhoneBook;
exports.PhoneBookSync = PhoneBookSync;
