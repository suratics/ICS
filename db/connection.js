const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ics:ics12345@cluster0.ppiur.mongodb.net/ICS", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("WE ARE CONNECTED WITH THE DATABASE");
  })
  .catch((err) => {
    console.log(`ERROR CAME :::::::::: ${err}`);
  });
