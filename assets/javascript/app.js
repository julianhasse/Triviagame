/* ========== Global Variables ==========
// ====================================== */

var Trivia = {
	time: 10, 
	countAnsw: 0, 
	rightAnsw: 0, 
	wrongAnsw: 0, 
	unAnswered: 0
} // init

var thumbsUp = '<span class="glyphicon glyphicon-thumbs-up"></span>';
var thumbsDown = '<span class="glyphicon glyphicon-thumbs-down"></span>';
var ok = '<span class="glyphicon glyphicon-ok"></span>';
var bad = '<span class="glyphicon glyphicon-remove"></span>';
var timeUp = '<span class="glyphicon glyphicon-time"></span>';


/* =========== Audio =============================
// ====================================== */
var ticking = new Audio('assets/audio/ticking.mp3');
var right = new Audio('assets/audio/right.mp3');
var wrong = new Audio('assets/audio/wrong.mp3');
var alert = new Audio('assets/audio/alert.mp3');
ticking.volume = 0.3; 
alert.volume = 0.3 
right.volume = 0.5
wrong.volume = 0.5


/* ========== Utility Functions =============
// ====================================== */

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
} // shuffle


/* ========== Main Functions =============
// ====================================== */

function countDown() {
	$('#timer').html(Trivia.time);
	ticking.play();
	Trivia.time --;
	if (Trivia.time < 0) {
		Trivia.unAnswered++;
		$('#result').html(timeUp + ' Time is up! The correct answer is ' + questionBank[Trivia.countAnsw].correct);
	ticking.pause();
	alert.play();	
		reset();
	}
} // countdown timer (10 seconds)

function getQuestion() {
	$('#timer').html(Trivia.time);
	$('#start').css('display', 'none');
	$('#startText').css('display', 'none');
	$('#timer').removeClass('displayNone');

	timer = setInterval(countDown, 1000);
	
	shuffle(questionBank[Trivia.countAnsw].answers);
	
	$('#question').append(questionBank[Trivia.countAnsw].question);
	
	for (var i = 0; i < questionBank[Trivia.countAnsw].answers.length; i++) {
		var btn = $('<button class="btn btn-primary btn-rounded">'); // generate buttons
		btn.text(questionBank[Trivia.countAnsw].answers[i]);
		btn.appendTo('#button' + i);
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
		displayScore();
	}
} // checkFinalAnswers

function checkAnswer() {

	$('button').on('click', function() {
		if ($(this).text() == questionBank[Trivia.countAnsw].correct) {
			$('#result').html(thumbsUp + ' You are right!');
			ticking.pause();
			right.play();
			Trivia.rightAnsw++;
			reset();
		} 
		else {
			$('#result').html(thumbsDown + ' The right answer is ' + questionBank[Trivia.countAnsw].correct);
			ticking.pause();
			wrong.play();
			Trivia.wrongAnsw++;
			reset();
		}
	});

	checkFinalAnswer();
} // checkAnswers

function displayScore() {
	$('#timer').addClass('displayNone');
	$('#question').html(ok + ' Right answers: ' + Trivia.rightAnsw + '<br>');
	$('#question').append(bad + ' Wrong answers: ' + Trivia.wrongAnsw + '<br>');
	$('#question').append(timeUp + ' Unanswered: ' + Trivia.unAnswered);
	$('#answers').html('<button id="restart" class="btn btn-default center-block"></button>');

	$("#restart").click(function() {
		location.reload();
   });
	
	clearInterval(timer);
	
} // display score

/* ========== Reset Functions =============
// ====================================== */

function empty() {
	for (var i = 0; i < 4; i++) {
		$('#button' + i).empty();
	}
	    $('#question').empty();
	    $('#result').empty();
} // clear text


function reset() {
	Trivia.countAnsw++;
	clearInterval(timer);
	setTimeout(empty, 3000);
	setTimeout(nextQuestion, 3000);
} // reset timers


function resetGame() {
	Trivia.time = 5;
	Trivia.countAnsw = 0;
	Trivia.rightAnsw = 0;
	Trivia.wrongAnsw = 0;
	Trivia.unAnswered = 0;
	setTimeout(getQuestion, 500);
} //reset game
