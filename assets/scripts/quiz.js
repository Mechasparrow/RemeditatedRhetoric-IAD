

//With AJAX
/**
function retrieveQuestions() {

  //DEBUG
  console.log("retrieving questions");

  //AJAX request
  $.ajax({
    url:"/assets/quiz/questions.txt",
    success:function(data, status) {
      console.log(data);
      let jsonData = JSON.parse(data);
      console.log(jsonData);
    }
  });
}
**/

//Without Ajax
function retrieveQuestions() {

  //I'm sorry this is hard-coded
  let questionData = {
    "questions": [
      "How often do you fantasize about the Internet, or think about what it would be like to be online when you are not on the Internet?"
      ,"How often do you neglect household chores to spend more time online?"
      ,"How often do you feel that you should decrease the amount of time spent online?"
      ,"How often do you daydream about the Internet?"
      ,"How often do you spend time online when you’d rather sleep?"
      ,"How often does it happen to you that you wish to decrease the amount of time spent online but you do not succeed?"
      ,"How often do you feel tense, irritated, or stressed if you cannot use the Internet for as long as you want to?"
      ,"How often do you choose the Internet rather than being with your partner?"
      ,"How often do you try to conceal the amount of time spent online?"
      ,"How often do you feel tense, irritated, or stressed if you cannot use the Internet for several days?"
      ,"How often does the use of Internet impair your work or your efficacy?"
      ,"How often do you feel that your Internet usage causes problems for you?"
      ,"How often does it happen to you that you feel depressed, moody, or nervous when you are not on the Internet and these feelings stop once you are back online?"
      ,"How often do people in your life complain about spending too much time online?"
      ,"How often do you realize saying when you are online, \“just a couple of more minutes and I will stop\”?"
      ,"How often do you dream about the Internet?"
      ,"How often do you choose the Internet rather than going out with somebody to have some fun?"
      ,"How often do you think that you should ask for help in relation to your Internet use?"
    ]
  };
  return questionData;
}

//Returns p element to render
function renderQuestion(questionString, questionId) {
  var questionElem = $("<div></div>")
  questionElem.addClass("question");
  questionElem.attr('id', questionId);

  var questionP = $("<p></p>").text(questionString);
  questionP.addClass("question-text");

  questionElem.append(questionP);

  var options = $("<div></div>");
  options.addClass("question-options");

  let likertOptions = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

  for (let i = 0; i < 5; i++) {

    //Create the radio option container
    let radioOptContainer = $("<div></div>");
    radioOptContainer.addClass("optionContainer");

    //Create the radio button
    let radioOpt = $("<input type=\"radio\">");
    radioOpt.attr("name", "radio-" + questionId)

    //Add the radio button value
    let optVal = (i+1);
    radioOpt.attr("value", optVal);

    if (i==0){
      radioOpt.attr("checked", "true");
    }

    let likertOpt = likertOptions[i];
    let likertElem = $("<p></p>").text(likertOpt);
    likertElem.addClass("likert-text");


    //Add to the radio opt container
    radioOptContainer.append(radioOpt);
    radioOptContainer.append(likertElem);

    options.append(radioOptContainer);
  }

  questionElem.append(options);

  return questionElem;
}

function renderQuestions(quizContainer, questions) {
  questions.map(function (question, idx) {
      let questionNum = (idx+1);
      let elem = renderQuestion(question, "question-" + questionNum.toString());
      quizContainer.append(elem);
  })
}

function pullQuestionScore(scoreIdx) {
  let radioValue = $("input[name='" + "radio-question-" + scoreIdx.toString() + "']:checked").val();

  if (radioValue) {
    return parseInt(radioValue, 10);
  }else {
    return 0;
  }
}

function pullQuestionScores(questions) {
  let questionScores = [];

  questions.map(function (elem, idx) {
    let questionScore = pullQuestionScore(idx+1);
    questionScores[idx] = questionScore;
  });

  return questionScores;
}

function displayQuizSubScores(questionScores) {

  //DEbug code
  questionScores.map(function (score, idx) {
    let questionNum = idx + 1;
    console.log(questionNum + ") " + score.toString());
  })


  //Compute scores
  let obssessionScore = 0;
  let neglectScore = 0;
  let controlScore = 0;

  for (let i = 0; i < questionScores.length; i+=3) {
    obssessionScore += questionScores[i];
    neglectScore += questionScores[i+1];
    controlScore += questionScores[i+2];
  }

  $("#obsession-display").text("Obsession: " + obssessionScore );
  $("#neglect-display").text("Neglect: " + neglectScore);
  $("#control-display").text("Control: " + controlScore);
}


$(document).ready(function () {

  //DEBUG statement
  console.log("Jquery is ready to launch!");

  //retreive question data
  var questions = retrieveQuestions()["questions"];

  var quizContainer = $("#quiz");
  var quizResultsContainer = $("#quiz-results");
  quizResultsContainer.hide();

  renderQuestions(quizContainer, questions);

  //Button submit event
  var quizBtn = $("#quiz-submit ");

  var questionScores;
  quizBtn.click(function (e) {
    console.log("Submitted!");
    questionScores = pullQuestionScores(questions);

    quizContainer.hide();
    quizBtn.hide();
    quizResultsContainer.show();

    displayQuizSubScores(questionScores);

  })

  var resetQuizBtn = $("#quiz-reset");
  resetQuizBtn.click(function(e) {
    location.reload();
  });

})
