const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://ICS:Abc123@cluster0.ks7nn.mongodb.net/ICS", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("WE ARE CONNECTED WITH THE DATABASE");
  })
  .catch((err) => {
    console.log(`ERROR CAME :::::::::: ${err}`);
  });
