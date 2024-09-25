const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://janviraghvani6708:JANVI2702@cluster0.wdh06.mongodb.net/"
);

const database = mongoose.connection;

database.on("connected", (err) => {
  if (err) {
    console.log("database not connected");
    return false;
  }
  console.log("database connected");
});

module.exports = database;
