var panel = $('#quiz-area');
var countStartNumber = 30;

//Click events

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time remaining: <span id="counter-number">30</span> Seconds<h2>');
    game.loadQuestion();
});

//Set of Questions:
var questions = [{
  question: "Who were Harry Potter's parents?",
  answers: ["James and Lily", "Severus and Miranda", "Tom and Bellatrix", "Lucius and Narcissa"],
  correctAnswer: "James and Lily",
  image: "assets/images/jamesLily.gif"
}, {
  question: "Who was Rubeus Hagrid?",
  answers: ["headmaster", "Potions Professor", "Herbology Professor", "Professor of Magical Creatures"],
  correctAnswer: "Professor of Magical Creatures",
  image: "assets/images/hagrid.gif"
}, {
  question: "Who were Harry's best friends?",
  answers: ["Neville and Luna", "Ginny and Cho", "Ron and Hermione", "Cedric and Seamus"],
  correctAnswer: "Ron and Hermione",
  image: "assets/images/ronHermione.gif"
},{
  question: "Who was Professor Snape?",
  answers: ["Professor of Dark Arts", "Professor of Divination", "Minister of Magic", "The Half Blood Prince"],
  correctAnswer: "The Half Blood Prince",
  image: "assets/images/snape.gif"
}, {
  question: "Who was the Quidditch Coach at Hogwarts School of Witchcraft and Wizardry?",
  answers: ["Madam Hooch", "Madam Pomfrey", "Professor McGonagall", "Professor Trelawney"],
  correctAnswer: "Madam Hooch",
  image: "assets/images/madamHooch.jpg"
}, {
  question: "What schools was not in the Triwizard Tournament?",
  answers: ["Durmstrang", "Beauxbatons Academy of Magic", "Howarts School of Witchcraft and Wizardry", "Ilvermorny School of Witchcraft and Wizardry"],
  correctAnswer: "Ilvermorny School of Witchcraft and Wizardry",
  image: "assets/images/Ilvermorny.jpg"
}, {
  question: "Who actually kills Voldemort?",
  answers: ["Hermione Granger", "Fred or George Weasley", "Nyphadora Tonks", "Neville Longbottom"],
  correctAnswer: "Neville Longbottom",
  image: "assets/images/neville.gif"
}, {
  question: "Who tried to save Harry Potter by almost killing him?",
  answers: ["Neville", "Luna", "Dobby", "Draco"],
  correctAnswer: "Dobby",
  image: "assets/images/dobby.gif"
}, {
  question: "Who was the only person who truly understood Harry?",
  answers: ["Luna Lovegood", "Molly Weasley", "Ginny Weasley", "Cho Chang"],
  correctAnswer: "Luna Lovegood",
  image: "assets/images/luna.gif"
}, {
  question: "What was the name of Professor Dumbledore's pet?",
  answers: ["Fluffy", "Dobby", "Fawkes", "Hedwig"],
  correctAnswer: "Fawkes",
  image: "assets/images/fawkes.gif"
}];

var game = {
  questions: questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function() {
    game.counter--;
    $('#counter-number').html(game.counter);
    if(game.counter ===0) {
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
    console.log('hello');
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
    }
},
nextQuestion: function() {
  game.counter = countStartNumber;
  $('#counter-number').html(game.counter);
  game.currentQuestion++;
  game.loadQuestion();
},
timeUp: function() {
  clearInterval(timer);
  $('#counter-number').html(game.counter);
  panel.html('<h2>Out of Time!</h2>');
  panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
  panel.append('<img src="' + questions[this.currentQuestion].image + '"/>');

  if(game.currentQuestion === question.length -1) {
    setTimeout(game.results, 3 * 1000);
  }else {
    setTimeout(game.nextQuestion, 3 * 1000);
  }
},
results: function() {
  clearInterval(timer);
  panel.html('<h2>All done, here is how you did:</h2>');
  $('#counter-number').html(game.counter);
  panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
  panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
  panel.append('<h3>Unaswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
  panel.append('<br><button id="start-over">Start Over?</button>');
},
clicked: function(e) {
  clearInterval(timer);
  if($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
    this.answeredCorrectly();
  }else{
    this.answeredIncorrectly();
  }
},
answeredIncorrectly: function() {
  game.incorrect++;
  clearInterval(timer);
  panel.html('<h2>Nope!</h2>');
  panel.append('<h3>The Correct Answer was: ' + question[game.currentQuestion].correctAnswer + '</h3>');
  panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

  if(game.currentQuestion === questions.length - 1) {
    setTimeout(game.results, 3 * 1000);
  }else{
    setTimeout(game.nextQuestion, 3 * 1000);
  }
},
answeredCorrectly: function() {
  clearInterval(timer);
  game.correct++;
  panel.html('<h2>Correct!</h2>');
  panel.append('<img src="' + questions[game.currentQuestion.image] + '" />');
  if(game.currentQuestion === questions.length - 1) {
    setTimeout(game.results, 3 * 1000);
  }else{
    setTimeout(game.nextQuestion, 3 * 1000);
  }
},
reset: function() {
  this.currentQuestion = 0;
  this.counter = countStartNumber;
  console.log('made it here');
  this.correct = 0;
  this.incorrect = 0;
  this.loadQuestion();
  }
};
