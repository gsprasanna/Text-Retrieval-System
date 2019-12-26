const { PhoneBookSync } = require("../models/PhoneBook");

// Synchronization of model with database
PhoneBookSync({ force: true });
