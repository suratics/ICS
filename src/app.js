require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");
const cookiesParser = require("cookie-parser");
const port = process.env.PORT || 3000;
require("../db/connection");

//MODELS PATH
const ContactModel = require("../models/contactmodel");
const McqModel = require("../models/mcqmodel");
const RegistrationModel = require("../models/registration");
const auth = require("../middleware/auth");

// APP USES
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesParser());

//ALL THE GET REQUEST
app.get("/", (req, res) => {
  res.render("signup");
});

app.get("/exam", auth, (req, res) => {
  res.render("about");
});

app.get("/freeexam", (req, res) => {
  res.render("freeexam");
});

app.get("/accountancyexam", (req, res) => {
  res.render("accountancyexam");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/adminpannel", (req, res) => {
  res.render("adminpannel");
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});

app.get("/successful", (req, res) => {
  res.render("successful");
});

//ALL THE POST REQUEST
app.post("/", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password === cpassword) {
      const UserData = new RegistrationModel({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });

      const token = await UserData.generateToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 360000 * 10),
        httpOnly: true,
      });

      const SaveUser = await UserData.save();
      console.log(SaveUser);
      res.status(201).render("index");
    } else {
      res.send("Passwords are not matching !");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const data = await RegistrationModel.findOne({ email: email });

    const isMatched = await bcrypt.compare(password, data.password);

    if (isMatched) {
      const token = await data.generateToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 360000 * 10),
        httpOnly: true,
      });
      res.status(201).render("index");
    } else {
      res.send("Invalid Details");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/forgotpassword", async (req, res) => {
  try {
    const userResetEmail = req.body.email;
    const userResetPassword = req.body.password;
    const userResetCPassword = req.body.cpassword;

    const RegestrationData = await RegistrationModel.findOne({
      email: userResetEmail,
    });

    if (userResetPassword === userResetCPassword) {
      if (!RegestrationData) {
        res.send("NO DATA FOUND WITH THIS EMAIL");
      } else {
        const newencryptedData = await bcrypt.hash(userResetPassword, 10);

        const UpadteOneUser = await RegistrationModel.findByIdAndUpdate(
          {
            _id: RegestrationData.id,
          },
          { password: newencryptedData },
          { new: true },
          (error, data) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data);
            }
          }
        );
      }
    } else {
      res.send("PASSWORDS DOES NOT MATCHED");
    }
  } catch (error) {
    res.render("successful");
  }
});

app.post("/contact", async (req, res) => {
  try {
    const ContactData = new ContactModel({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      messages: req.body.messages,
    });

    const DataBaseSaver = await ContactData.save();
    console.log(DataBaseSaver);
    res.status(201).render("thanks");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/adminpannel", async (req, res) => {
  try {
    const NewQuestion = new McqModel({
      subject: req.body.subject,
      part: req.body.part,
      sections: req.body.sections,
      question: req.body.question,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      correctoption: req.body.correctoption,
    });

    const NewQuestionUpload = await NewQuestion.save();
    res.render("adminpannel");
  } catch (error) {
    res.status(400).send(error);
  }
});

//INDIVIDUAL ENDPOINTS API SEARCHES
app.get("/questions/mcq/api", async (req, res) => {
  try {
    const AllMcq = await McqModel.find();
    res.send(AllMcq);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/questions/mcq/api/:subject", async (req, res) => {
  try {
    const usersubject = req.params.subject;
    const getSubQues = await McqModel.find({
      subject: usersubject,
    });
    res.send(getSubQues);
  } catch (error) {
    console.log(error);
  }
});

app.get("/questions/mcq/api/:subject/:part", async (req, res) => {
  try {
    const userFetch = req.params.part;
    const usersubject = req.params.subject;
    const getPart = await McqModel.find({
      part: userFetch,
      subject: usersubject,
    });
    res.send(getPart);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/questions/mcq/api/:subject/:part/:section", async (req, res) => {
  try {
    const userPart = req.params.part;
    const userSection = req.params.section;
    const usersubject = req.params.subject;
    const getQuestions = await McqModel.find({
      part: userPart,
      sections: userSection,
      subject: usersubject,
    });
    res.send(getQuestions);
  } catch (error) {
    res.status(400).send(error);
  }
});

//RENDERING THE ERROR PAGE
app.get("*", (req, res) => {
  res.render("error");
});

app.listen(port, () => {
  console.log(`Your Application is running at http://127.0.0.1:${port}`);
});
