// GLOBAL VARIABLES
// =============================================================================

// https://www.opentdb.com/api.php?amount=11&category=9&difficulty=medium&type=multiple&encode=url3986

$.ajax({
	url: "https://cocktail-trivia-api.herokuapp.com/api/category/science-computers/difficulty/easy/count/11", 
	method: 'GET'}).done(function(response) {
		console.log(response);

	     for (var i = 0; i < response.length; i++) {
	     	question.push(response[i].text);
	     	incorrectAnswers.push(response[i].incorrectAnswers);
	     	correctAnswers.push(response[i].correctAnswers);
	     }

	}); 
var question = [];
var incorrectAnswers = [];
var correctAnswers = [];
var answerList;


var time = 5;
var questionCount = 0;
var correct = 0;
var incorrect = 0;
var unAnswered = 0;
var click = 0;



// FUNCTIONS
// =================================================================================================

function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function countDown() {
	$('#timer').html(time);
	time --;
	if (time < 0) {
		unAnswered++;
		$('#result').html('Time is up! The correct answer is ' + correctAnswers[questionCount]);
		reset();
	}
}

function getQuestion() {
	timer = setInterval(countDown, 1000);
	$('#question').append(question[questionCount]);
	answerList = incorrectAnswers[questionCount];
	answerList.push(correctAnswers[questionCount]);
	shuffleAnswers(answerList);
	for (var i = 0; i < answerList.length; i++) {
		var b = $('<button>');
		b.text(answerList[i]);
		b.appendTo('#answers');
	}
	checkAnswer();
}

function nextQuestion() {
	time = 5;
	$('#timer').html(time);
	getQuestion();
}

function checkFinalAnswer() {
	if (questionCount === question.length -1){
		displayResults();
	}
}

function checkAnswer() {

	$('button').on('click', function() {
		if ($(this).text() == correctAnswers[questionCount]) {
			$('#result').html('That was the correct answer');
			correct++;
			reset();
		} 
		else {
			$('#result').html('That answer was incorrect the correct answer is ' + correctAnswers[questionCount]);
			incorrect++;
			reset();
		}
	});
	console.log(questionCount);
	checkFinalAnswer();
}

function empty() {
	$('#question').empty();
	$('#answers').empty();
	$('#result').empty();
}

function reset() {
	questionCount++;
	clearInterval(timer);
	setTimeout(empty, 1000);
	setTimeout(nextQuestion, 1000);
}

function displayResults() {
	$('#timer').empty();
	$('#result').html('Correct Answers: ' + correct);
	$('#question').html('Incorrect Answers: ' + incorrect);
	$('#answers').html('Unanswered:' + unAnswered);
	clearInterval(timer);
}




