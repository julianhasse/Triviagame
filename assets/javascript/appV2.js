// GLOBAL VARIABLES
// =============================================================================
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

var queryURL ="https://opentdb.com/api.php?amount=10&type=multiple"

$.ajax({
	url: queryURL,
	method: 'GET'}).done(function(response) {

		console.log(response);

	     for (var i = 0; i < response.length; i++) {
	     	question.push(response.results[i].question);
	     	incorrectAnswers.push(response.results[i].incorrect_answers);
			correctAnswers.push(response.results[i].correct_answers);
			
			}

			console.log(question);
			console.log(incorrectAnswers);
			console.log(correctAnswers);

	}); 




// FUNCTIONS
// =================================================================================================

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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

// getQuestion();


