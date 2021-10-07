const jwt = require("jsonwebtoken");
const RegistrationModel = require("../models/registration");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    const user = await RegistrationModel.findOne({ _id: verifyUser._id });
    console.log(user);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = auth;
