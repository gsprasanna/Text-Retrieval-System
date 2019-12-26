require("dotenv").config();
const Sequelize = require("sequelize");

/**
 * setting the connection to the database.
 * Here postgresql is used.
 */
const PhoneBookDB = new Sequelize(process.env.DB_URL);

//Testing the connection establishment with DB
PhoneBookDB.authenticate()
  .then(() => {
    console.log(
      "Connection has been established successfully with the phone book database."
    );
  })
  .catch(err => {
    console.error("Unable to connect to the phone book database:", err);
  });

module.exports = PhoneBookDB;
