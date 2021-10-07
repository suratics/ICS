require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegistrationSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  mobile: { type: Number, required: true, minlength: 10 },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: { type: String, required: true, minlength: 4 },
  cpassword: { type: String, required: true, minlength: 4 },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

//MIDDLEWARE TO GENERATE THE OAUTH TOKEN
RegistrationSchema.methods.generateToken = async function () {
  try {
    const Authtoken = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: Authtoken });
    await this.save();
    return Authtoken;
  } catch (error) {
    console.log(error);
  }
};

//MIDDLEWARE TO HASH PASSWORD BEFORE STORING
RegistrationSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.password, 10);
  }
  next();
});

const RegistrationModel = new mongoose.model(
  "RegistrationModel",
  RegistrationSchema
);
module.exports = RegistrationModel;
