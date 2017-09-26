// GLOBAL VARIABLES
// =============================================================================

var questionAnswer = [

	{
		question: 'Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?',
		answers: ['Apple', 'Atari', 'Microsoft', 'Comodore'],
		correct: 'Apple'
	},

	{
		question: 'What does CPU stand for?',
		answers: ['Central Processing Unit', 'Computer Personal Unit', 'Central Process Unit', 'Central Processor Unit'],
		correct: 'Central Processing Unit'
	},

	{
		question: 'What does the \"MP\"stand for in MP3?',	
		answers: ['Multi Pass', 'Micro Point', 'Moving Picture', 'Music Player'],
		correct: 'Moving Picture'
	},

	{
		question: 'How many bytes are in a kilobyte of RAM?',	
		answers: ['1024', '512', '500', '1000'],
		correct: '1024'
	},

	{
		question: 'The programming language Swift was created to replace what other programming language?',	
		answers: ['C++', 'Objective_C', 'C#', 'Ruby'],
		correct: 'Objective_C'
	},

	{
		question: 'What amount of bits commonly equals one byte?',	
		answers: ['2', '1', '8', '64'],
		correct: '8'
	},

	{
		question: 'In the programming language Java, which of these keywords would you put on a variable to make sure it doesn\'t get modified?',	
		answers: ['Final', 'Static', 'Public', 'Private'],
		correct: 'Final'
	},

	{
		question: 'What is the most preferred image format used for logos in the Wikimedia database?',	
		answers: ['jpeg', 'svg', 'gif', 'png'],
		correct: 'svg'
	},

	{
		question: 'In web design, what does CSS stand for?',	
		answers: ['Cascading Style Sheet', 'Corrective Style Sheet', 'Counter Strike Source', 'Computer Style Sheet'],
		correct: '3'
	},

	{
		question: 'What is the domain name for the country Tuvalu?',	
		answers: ['.tu', '.tv', '.tt', '.tl'],
		correct: '.tv'
	},

	{
		question: 'How many kilobytes in one gigabyte?',	
		answers: ['1000000', '1024', '1000', '1048576'],
		correct: '.tv'
	}
];

var time = 10;

var questionCount = 0;

var correct = 0;

var incorrect = 0;

var unAnswered = 0;

var click = 0;

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
	$('#timer').html('Timer: ' + time);
	time --;
	if (time < 0) {
		unAnswered++;
		$('#result').html('Time is up! The correct answer is ' + questionAnswer[questionCount].correct);
		reset();
	}
}

function getQuestion() {
	$('#timer').html('Timer: ' + time);
	$('#start').css('display', 'none');
	$('#startText').css('display', 'none');
	$('#timer').removeClass('displayNone');
	timer = setInterval(countDown, 1000);
	console.log(questionAnswer[questionCount].answers);
	shuffleAnswers(questionAnswer[questionCount].answers);
	console.log(questionAnswer[questionCount].answers);
	$('#question').append(questionAnswer[questionCount].question);
	for (var i = 0; i < questionAnswer[questionCount].answers.length; i++) {
		var b = $('<button class="btn pill">');
		b.text(questionAnswer[questionCount].answers[i]);
		b.appendTo('#button'+i);
	}
	checkAnswer();
}

function nextQuestion() {
	time = 10;
	$('#timer').html('Timer: ' + time);
	getQuestion();
}

function checkFinalAnswer() {
	if (questionCount === questionAnswer.length -1){
		displayResults();
	}
}

function checkAnswer() {

	$('button').on('click', function() {
		if ($(this).text() == questionAnswer[questionCount].correct) {
			$('#result').html('That was the correct answer');
			correct++;
			reset();
		} 
		else {
			$('#result').html('That answer was incorrect the correct answer is ' + questionAnswer[questionCount].correct);
			incorrect++;
			reset();
		}
	});
	console.log(questionCount);
	checkFinalAnswer();
}

function empty() {
	for (var i = 0; i < 4; i++) {
		$('#button'+i).empty();
	}
	$('#question').empty();
	$('#result').empty();
}

function reset() {
	questionCount++;
	clearInterval(timer);
	setTimeout(empty, 3000);
	setTimeout(nextQuestion, 3000);
}

function displayResults() {
	$('#timer').addClass('displayNone');
	// $('#reset').removeClass('displayNone');
	// $('#resetText').removeClass('displayNone');
	$('#result').html('Correct Answers: ' + correct);
	$('#question').html('Incorrect Answers: ' + incorrect);
	$('#answers').html('Unanswered:' + unAnswered);
	clearInterval(timer);
}

function resetGame() {
	// location.reload;
	time = 5;
	questionCount = 0;
	correct = 0;
	incorrect = 0;
	unAnswered = 0;
	setTimeout(getQuestion, 500);
}
