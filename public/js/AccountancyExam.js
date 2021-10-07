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

const TermsAcceptBtn = document.querySelector("#termsAcceptedBtn");
const TermsAndconditionRow = document.querySelector(
  ".Terms__and__condition__row"
);
const McqROW = document.querySelector(".MCQ___ROW");

//GETTING A RANDOM NUMBER IN BETWEEN TWO PROVIDED VALUES
const getRandomNumber = (min, max) => {
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
};

const getAccountancyQuestionsLoaded = async function () {
  try {
    //PART -> 1 SECTION A QUESTIONS (1 to 18)
    const response1 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part1/sectiona"
    );
    const data1 = await response1.json();

    //PART -> 1 SECTION B QUESTIONS (19 to 36)
    const response2 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part1/sectionb"
    );
    const data2 = await response2.json();

    //PART -> 1 SECTION C QUESTIONS (37 to 41)
    const response3 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part1/sectionc"
    );
    const data3 = await response3.json();

    //PART -> 2 SECTION A QUESTIONS (42 to 48)
    const response4 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part2/sectiona"
    );
    const data4 = await response4.json();

    //PART -> 2 SECTION B QUESTIONS (49 to 55)
    const response5 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part2/sectionb"
    );
    const data5 = await response5.json();

    //PART -> 3 SECTION A QUESTIONS (56 to 62)
    const response6 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part3/sectiona"
    );
    const data6 = await response6.json();

    //PART -> 3 SECTION B QUESTIONS (63 to 69)
    const response7 = await fetch(
      "http://127.0.0.1:3000/questions/mcq/api/accountancy/part3/sectionb"
    );
    const data7 = await response7.json();

    let QueDB = [];
    //LOADING QUESTIONS TO DB
    let QueCount1 = 0;
    let QueCount2 = 0;
    let QueCount3 = 0;
    let QueCount4 = 0;
    let QueCount5 = 0;
    let QueCount6 = 0;
    let QueCount7 = 0;

    for (let i = 0; i < 18; i++) {
      QueDB.push(data1[QueCount1]);
      QueCount1++;
    }
    for (let i = 0; i < 18; i++) {
      QueDB.push(data2[QueCount2]);
      QueCount2++;
    }
    for (let i = 0; i < 5; i++) {
      QueDB.push(data3[QueCount3]);
      QueCount3++;
    }
    for (let i = 0; i < 7; i++) {
      QueDB.push(data4[QueCount4]);
      QueCount4++;
    }
    for (let i = 0; i < 7; i++) {
      QueDB.push(data5[QueCount5]);
      QueCount5++;
    }
    for (let i = 0; i < 7; i++) {
      QueDB.push(data6[QueCount6]);
      QueCount6++;
    }
    for (let i = 0; i < 7; i++) {
      QueDB.push(data7[QueCount7]);
      QueCount7++;
    }

    let QuestionCount = 0;
    let score = 0;
    let TotalMarks = 40;

    // MANIPULATING THE QUESTIONS
    const LoadQuestion = () => {
      let NewQues = QueDB[QuestionCount];
      Question.textContent = NewQues.question;
      Ans1.textContent = NewQues.option1;
      Ans2.textContent = NewQues.option2;
      Ans3.textContent = NewQues.option3;
      Ans4.textContent = NewQues.option4;
      QuestionNumber.textContent = QuestionCount + 1;
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

      if (QuestionCount < QueDB.length) {
        LoadQuestion();
        deselectCheckBtn();
      } else {
        showScore.style.display = "block";
        total__questions.textContent = TotalMarks;
        my__score.textContent = `${score > 39 ? "40" : score}`;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
getAccountancyQuestionsLoaded();

TermsAcceptBtn.addEventListener("click", () => {
  TermsAndconditionRow.classList.toggle("hidden__row");
  McqROW.classList.toggle("hidden__row");
});
