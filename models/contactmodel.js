const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12,
  },
  messages: {
    type: String,
    required: true,
  },
});

const ContactModel = new mongoose.model("ContactModel", ContactSchema);
module.exports = ContactModel;
