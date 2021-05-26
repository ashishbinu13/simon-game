var buttonColors = ["blue", "green", "red", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var checkSequence = true;

$(document).on("keydown", function () {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
  } else {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
