var gameArray = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gameArray.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playMusic(randomChosenColor);
}

function playMusic(color) {
  var buttonMusic = new Audio("sounds/" + color + ".mp3");
  buttonMusic.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gameArray[currentLevel]) {
    console.log("true");

    if (userClickedPattern.length === gameArray.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } 
  else {
    var wrongMusic = new Audio("sounds/wrong.mp3");
    wrongMusic.play();
    $("body").addClass('game-over');
    setTimeout(function () {
      $("body").removeClass('game-over');
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart.");
    startOver();

  }
}


function startOver(){

level=0;
gameArray=[];
started=false;

}

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playMusic(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
