const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
require("../db/connection");

//MODELS PATH
const ContactModel = require("../models/contactmodel");
const McqModel = require("../models/mcqmodel");

// APP USES
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ALL THE GET REQUEST
app.get("/", (req, res) => {
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

//ALL THE POST REQUEST
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

app.get("/questions/mcq/api/:part", async (req, res) => {
  try {
    const userFetch = req.params.part;
    const getPart = await McqModel.find({ part: userFetch });
    res.send(getPart);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/questions/mcq/api/:part/:section", async (req, res) => {
  try {
    const userPart = req.params.part;
    const userSection = req.params.section;
    const getQuestions = await McqModel.find({
      part: userPart,
      sections: userSection,
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
