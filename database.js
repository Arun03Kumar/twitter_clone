const mongoose = require("mongoose");

class Database {
  constructor() {
    mongoose
      .connect(
        "mongodb+srv://admin:admin@cluster0.7dohqco.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("connection done");
      })
      .catch((err) => {
        console.log("connection error", err);
      });
  }
}

module.exports = new Database()