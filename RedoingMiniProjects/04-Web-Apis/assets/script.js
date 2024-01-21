const startBtn = document.querySelector("#start-btn");
const timerEl = document.querySelector("#timer");

const answerSelect = document.querySelector("#quizBox");

let timeLeft = 75;
let currentQuestionIndexNumber = 0;
let score = 0;
let currentQuestion;
const questionsArray = [
  {
    questionText:
      "_______ is the process of finding errors and fixing them within a program.",
    questionAnswers: ["Compiling ", "Debugging ", "Executing ", "Scanning"],
    rightAnswer: "Debugging ",
  },
  {
    questionText:
      "Which of the sets of statements below will add 1 to x if x is positive and subtract 1 from x if x is negative but leave x alone if x is 0?",
    questionAnswers: [
      "If (x > 0) x++; else x--; ",
      "If (x > 0) x++; else if (x < 0) x--; ",
      "X++; x--; ",
      "If (x == 0) x = 0; else x++; x--; ",
    ],
    rightAnswer: "If (x == 0) x = 0; else x++; x--; ",
  },
  {
    questionText: "Which command will stop an infinite loop?",
    questionAnswers: ["Alt + C ", "Shift + Esc ", "Esc ", "Ctrl + C "],
    rightAnswer: "Ctrl + C ",
  },
  {
    questionText:
      "Jay is considering adding a repetition statement within his Java programming final project. Jay is unsure of the number of times each loop needs to execute.  Analyze the conditional statements below and select which statement best fits the need identified by Jay within his programming.",
    questionAnswers: ["While loop", "If-Else", "For loop", "Switch statement"],
    rightAnswer: "While loop",
  },
  {
    questionText:
    "Score =Keyboard.readInt(); while (score !=  -1)         { System.out.println (“The score is” + score); score =Keyboard.readInt();         } USER INPUT = -1, predict what will happen after the user input is accepted into the java program.",
    questionAnswers: [
      "The while statement will continue to ask the user to enter a score and then print out the score that has been received.",
      "The while loop will execute an infinite number of times because the program statement can never be false",
      "The while statement will never print the statement “The score is” because the condition present within the while will be false on the first time through.",
      "The while statement will function until a value other than -1 is entered.",
    ],
    rightAnswer:
    "The while statement will never print the statement “The score is” because the condition present within the while will be false on the first time through.",
  },
];

const displayQuestion = () => {
  let currentQuestion = questionsArray[currentQuestionIndexNumber];

  // if the currentindexnumber is less than 5, then -->
  if (currentQuestionIndexNumber <= questionsArray.length) {
    //definining the variables inside the function so they are only used INSIDE the function

    let questionText = "<h4>" + currentQuestion.questionText + "</h4>";

    //wraps the question in h4 tags

    let answerButtons = currentQuestion.questionAnswers.map(function (answer) {
      let button =
        '<button class="answer-btn" data-answer="' +
        answer +
        '">' +
        answer +
        "</button>";
      let listItem = '<li id="hello">' + button + "</li>";

      return listItem;
    });
    //Creates buttons which are substituded with the question answers LIST,
    //which is put into a <li> in order to mark them down as bullet points (id = "helo" in css file)

    let answersHTML = "<ul>" + answerButtons.join("") + "</ul>";
    //crates unordered list using the variable we defined earlier as "answerButtons" and
    //.join then uses "Concat" method to create new array essentially (accoriding to google lol)
    quizBox.innerHTML = questionText + answersHTML;
    //This final code brings everything together and says that: inside the quizBox inside the innerHTML
    // we display the question and the answers below it in bullet points and as buttons after we press "begin"
  } else {
    endQuiz();
  }
}

const countdownFunction = () => {
  countdown = setInterval(function () {
    console.log("secondsGoneBy");
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = "Time Left: " + timeLeft;
    } else {
      endQuiz();
    }
  }, 1000);
}

const startQuiz = () => {
  startBtn.hidden = true;
  quizBox.textContent = "";

  timeLeft = 75;
  currentQuestionIndexNumber = 0;
  score = 0;

  //start countdown
  countdownFunction();
//showquestions
  displayQuestion();
}


const checkAnswer = (userAnswer) => {

  if (currentQuestionIndexNumber < questionsArray.length) {
    let currentQuestion = questionsArray[currentQuestionIndexNumber];
    // labels the current index that we are on in the questionsARRAY
    if (userAnswer === currentQuestion.rightAnswer) {
      let currentQuestion = questionsArray[currentQuestionIndexNumber];

    console.log("currentQuestion", currentQuestion);
    console.log("userAnswer", userAnswer);

      score += 10; // adds 10 points to our score variable
    } else {
      timeLeft -= 10; // subtracts 10 seconds from the timeLeft variable
    }
    currentQuestionIndexNumber++;
    // adds 1 to our index number, meaning we move onto the next questions in the ARRAY
    if (currentQuestionIndexNumber < questionsArray.length) {

      displayQuestion();

    } else {
      endQuiz();
    }
    // once we move onto the next index number in the array, we use the function "displayQuestion()"
    // to display whatever the current index number is + 1 (aka next questions)
  } 
};

const displayLeaderboard = (scores) => {
  // select elemt where we want to display the leader board (dynamically)
  let leaderboardContainer = document.querySelector(`#leaderboard`);

  // clear the previous leaderboard content to empty string
  leaderboardContainer.innerHTML = ``;

  scores.forEach((userScore, index) => {
    // screate and append HTML for each score in the leaderboard
    let leaderboardItem = document.createElement(`div`);
    leaderboardItem.innerHTML = `<p>${index + 1}. ${userScore.initials}: ${userScore.score}</p>`;
    leaderboardContainer.appendChild(leaderboardItem);
  });
}


const saveScores = () => {
  let InitialsID = document.querySelector(`#initials`);
  let userInitials = InitialsID.value.trim();

  if (userInitials !== ``) {
    let userScore = {
      initials: userInitials,
      score,
    };
    console.log( `score saved:`, userScore);
    // will graab scores from local storage or create an empy array if there are none.
    let scores = JSON.parse(localStorage.getItem(`scores`)) || [];

    // will ad a new score to the empty array of scores stored in local above^^
    scores.push(userScore);

    // will sort the scores array in decending order based on the score value\
    // will sort them as a then b, but B will always be subtracted from A score, making it so the lower value will go second? (i assume)
    scores.sort((a, b) => b.score - a.score);

    // store the updated scores array in local storage as JSON
    localStorage.setItem(`scores`, JSON.stringify(scores));

    // finally display the array as a leaderboard :
    displayLeaderboard(scores);

    // reset the value of score to zero
    score = 0;

    //will hide the fromsubmittion after it is filled out
    document.querySelector(`#saveScoreContainer`).style.display = `none`;
  } else {
    alert(`please enter your initials.`);
  }
}

const endQuiz = () => {
  clearInterval(countdown);
  console.log("Quiz Over");

  // Hide Questions and show LEADERBOARD:
  document.querySelector(`#quizBox`).style.display = `none`;

  // Show the container for the form to save scores + initials
  document.querySelector(`#saveScoreContainer`).style.display = `block`;

  // Retrieve and display the leaderboard
  displayLeaderboard(JSON.parse(localStorage.getItem("scores")) || []);
}

// Add this function to hide the form 
const hideSaveScoreContainer = () => {
  document.querySelector(`#saveScoreContainer`).style.display = `none`;
}


startBtn.addEventListener("click", function () {
  console.log("Quiz Start");
  startQuiz();
});

// answerSelect.addEventListener('click', function() {
// checkAnswer();
// }); //commented out, but was original start to eventlistener(below)//

answerSelect.addEventListener("click", function (event) {
  // Check if the clicked element is a button with the class "answer-btn"
  if (event.target.matches(".answer-btn")) {
    // Get the user's answer from the clicked button's data-answer attribute
    let userAnswer = event.target.getAttribute("data-answer");
    // Call the checkAnswer function with the user's answer
    checkAnswer(userAnswer);
  }
});


// will display scoreboard as soon as the page is loaded up:
displayLeaderboard(JSON.parse(localStorage.getItem("scores")) || []);

