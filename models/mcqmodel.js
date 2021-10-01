const mongoose = require("mongoose");

const McqSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    lowercase: true,
  },
  part: {
    type: String,
    required: true,
    lowercase: true,
  },
  sections: {
    type: String,
    required: true,
    lowercase: true,
  },
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  correctoption: {
    type: String,
    required: true,
  },
});

const McqModel = new mongoose.model("McqModel", McqSchema);
module.exports = McqModel;
