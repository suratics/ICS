const Question = document.querySelector(".question");
const Ans1 = document.querySelector("#option1");
const Ans2 = document.querySelector("#option2");
const Ans3 = document.querySelector("#option3");
const Ans4 = document.querySelector("#option4");
const submitBtn = document.querySelector("#submit");
const showScore = document.querySelector(".showScore");
const total__questions = document.querySelector(".total__questions");
const my__score = document.querySelector(".my__score");
const playAgain = document.querySelector(".playAgain");
const answers = document.querySelectorAll(".answer");
const QuestionNumber = document.querySelector("#QuestionCount");

//GETTING A RANDOM NUMBER IN BETWEEN TWO PROVIDED VALUES
const getRandomNumber = (min, max) => {
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
};

//LOADING AND WORKING WITH THE QUESTIONS
const getAllQuestions = async function () {
  const res = await fetch("https://suratics.herokuapp.com/questions/mcq/api");
  const QueDB = await res.json();

  let QuestionCount = getRandomNumber(0, 40);
  let QuestionNumm = 0;
  let score = 0;
  let Questionlimit = 20;

  // MANIPULATING THE QUESTIONS
  const LoadQuestion = () => {
    let QuestionList = QueDB[QuestionCount];
    Question.textContent = QuestionList.question;
    Ans1.textContent = QuestionList.option1;
    Ans2.textContent = QuestionList.option2;
    Ans3.textContent = QuestionList.option3;
    Ans4.textContent = QuestionList.option4;
    QuestionNumber.textContent = QuestionNumm + 1;
  };
  LoadQuestion();

  // FUNCTION TO CHECK THE ANSWER
  const getCheckedAnswer = () => {
    let myAnswer;
    answers.forEach((element) => {
      if (element.checked) {
        myAnswer = element.id;
      }
    });
    return myAnswer;
  };

  // FUNCTION TO DESELECT THE ANSWER
  const deselectCheckBtn = () => {
    answers.forEach((element) => {
      element.checked = false;
    });
  };

  // SUBMIT BUTTON KEYPRESSING EVENT
  submitBtn.addEventListener("click", () => {
    const checkedAnswer = getCheckedAnswer();
    if (checkedAnswer === QueDB[QuestionCount].correctoption) {
      score++;
    }

    QuestionCount++;
    QuestionNumm++;

    if (QuestionNumm < Questionlimit) {
      LoadQuestion();
      deselectCheckBtn();
    } else {
      showScore.style.display = "block";
      total__questions.textContent = Questionlimit;
      my__score.textContent = `${score}`;
    }
  });

  playAgain.addEventListener("click", () => {
    showScore.style.display = "none";
    location.reload();
    QuestionCount = randomNum(0, 40);
    QuestionNumm = 0;
    score = 0;
    LoadQuestion();
  });
};

getAllQuestions();
