/* ========== Global Variables ==========
// ====================================== */

var Trivia = {
	time: 10, 
	countAnsw: 0, 
	rightAnsw: 0, 
	wrongAnsw: 0, 
	unAnswered: 0
} // init


/* =========== Glyphicons ==================
// ====================================== */
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

$('#start').on('click', function(){
	
	setTimeout(startTrivia, 250);

});

function counter() {
	$('#timer').html(Trivia.time);
	ticking.play();
	Trivia.time --;
	if (Trivia.time < 0) {
		Trivia.unAnswered++;
		$('#result').html(timeUp + ' The correct answer is ' + questionBank[Trivia.countAnsw].correct);
	ticking.pause();
	alert.play();	
		resetTimers();
	}
} // counter (10 seconds)

function startTrivia() {
	$('#timer').html(Trivia.time);
	$('#start').css('display', 'none');
	$('#startText').css('display', 'none');
	$('#timer').removeClass('displayNone');
	$('#question').css("background-image","url(assets/images/questionBack.png)");
	$('#result').css("background-image","url(assets/images/backResults.png)");
	$('#result').empty();
	

	timer = setInterval(counter, 1000);
	
	shuffle(questionBank[Trivia.countAnsw].answers);
	
	$('#question').append(questionBank[Trivia.countAnsw].question);
	
	for (var i = 0; i < questionBank[Trivia.countAnsw].answers.length; i++) {
		var btn = $('<button class="btn btn-primary btn-rounded">'); 
		btn.text(questionBank[Trivia.countAnsw].answers[i]);
		btn.appendTo('#btn' + i);
	}
	checkAnswer();
} // startTrivia

function nextQuestion() {
	Trivia.time = 10;
	$('#timer').html(Trivia.time);
	startTrivia();
} // nextQuestion

function checkLastAnswer() {
	if (Trivia.countAnsw === questionBank.length -1){
		displayScore();
	}
} // checkFinalAnswers

function checkAnswer() {

	$('button').on('click', function() {
		if ($(this).text() == questionBank[Trivia.countAnsw].correct) {
			$('#result').html(thumbsUp + ' You are right!');
			$('#headerImage').css("background-image",`url(assets/images/${questionBank[Trivia.countAnsw].correct}.png)`);
			ticking.pause();
			right.play();
			Trivia.rightAnsw++;
			resetTimers();
		} 
		else {
			$('#result').html(thumbsDown + ' The right answer is ' + questionBank[Trivia.countAnsw].correct);
			$('#headerImage').css("background-image","url(assets/images/fail.png)");
			ticking.pause();
			wrong.play();
			Trivia.wrongAnsw++;
			resetTimers();
		}
	});

	checkLastAnswer();
} // checkAnswers

function displayScore() {
	$('#timer').addClass('displayNone');
	$('#result').text("Thank you for playing!")
	$('#question').html(ok + ' Right answers: ' + Trivia.rightAnsw + '<br>');
	$('#question').append(bad + ' Wrong answers: ' + Trivia.wrongAnsw + '<br>');
	$('#question').append(timeUp + ' Unanswered: ' + Trivia.unAnswered);
	$('#answers').html('<button id="restart" class="btn btn-default center-block"></button>');
	$('#headerImage').css("background-image","url(assets/images/trivia.png)");


	$("#restart").click(function() {
		location.reload();
   });
	
	clearInterval(timer);
	
} // display score

/* ========== Reset Functions =============
// ====================================== */

function resetText() {
	for (var i = 0; i < 4; i++) {
		$('#btn' + i).empty();
	}
	    $('#question').empty();
	    $('#result').empty();
} // clear text


function resetTimers() {
	Trivia.countAnsw++;
	clearInterval(timer);
	setTimeout(resetText, 2000);
	setTimeout(nextQuestion, 2000);
} // reset timers


function resetGame() {
	Trivia.time = 5;
	Trivia.countAnsw = 0;
	Trivia.rightAnsw = 0;
	Trivia.wrongAnsw = 0;
	Trivia.unAnswered = 0;
	setTimeout(startTrivia, 500);
} //reset game
