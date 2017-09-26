/* ========== Global Variables Init ==========
// ====================================== */

var Trivia = {
	time: 10, 
	countAnsw: 0, 
	rightAnsw: 0, 
	wrongAnsw: 0, 
	unAnswered: 0
}

/* ========== Functions ===============
// ====================================== */

function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
} // shuffleAnswers

function countDown() {
	$('#timer').html(Trivia.time);
	Trivia.time --;
	if (Trivia.time < 0) {
		Trivia.unAnswered++;
		$('#result').html('Time is up! The correct answer is ' + questionBank[Trivia.countAnsw].correct);
		reset();
	}
} // countDown

function getQuestion() {
	$('#timer').html(Trivia.time);
	$('#start').css('display', 'none');
	$('#startText').css('display', 'none');
	$('#timer').removeClass('displayNone');

	timer = setInterval(countDown, 1000);
	
	shuffleAnswers(questionBank[Trivia.countAnsw].answers);
	
	$('#question').append(questionBank[Trivia.countAnsw].question);
	
	for (var i = 0; i < questionBank[Trivia.countAnsw].answers.length; i++) {
		var b = $('<button class="btn pill">'); // generate buttons
		b.text(questionBank[Trivia.countAnsw].answers[i]);
		b.appendTo('#button'+i);
	}
	checkAnswer();
} // getQuestion

function nextQuestion() {
	Trivia.time = 10;
	$('#timer').html(Trivia.time);
	getQuestion();
} // nextQuestion

function checkFinalAnswer() {
	if (Trivia.countAnsw === questionBank.length -1){
		displayResults();
	}
} // checkFinalAnswers

function checkAnswer() {

	$('button').on('click', function() {
		if ($(this).text() == questionBank[Trivia.countAnsw].correct) {
			$('#result').html('That was the correct answer');
			Trivia.rightAnsw++;
			reset();
		} 
		else {
			$('#result').html('That answer was incorrect the correct answer is ' + questionBank[Trivia.countAnsw].correct);
			Trivia.wrongAnsw++;
			reset();
		}
	});

	checkFinalAnswer();
} // checkAnswers

function empty() {
	for (var i = 0; i < 4; i++) {
		$('#button'+i).empty();
	}
	$('#question').empty();
	$('#result').empty();
} // clear

function reset() {
	Trivia.countAnsw++;
	clearInterval(timer);
	setTimeout(empty, 3000);
	setTimeout(nextQuestion, 3000);
} // reset timers

function displayResults() {
	$('#timer').addClass('displayNone');
	$('#result').html('Correct Answers: ' + Trivia.rightAnsw);
	$('#question').html('Incorrect Answers: ' + Trivia.wrongAnsw);
	$('#answers').html('Unanswered:' + Trivia.unAnswered);
	clearInterval(timer);
} // display score

function resetGame() {
	Trivia.time = 5;
	Trivia.countAnsw = 0;
	Trivia.rightAnsw = 0;
	Trivia.wrongAnsw = 0;
	Trivia.unAnswered = 0;
	setTimeout(getQuestion, 500);
} //resetGame
