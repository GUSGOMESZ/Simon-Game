
var buttonColours = ["red", "blue", "green", "yellow"];

var simonPattern = [];
var userPattern = [];

var started = false;
var level = 0;

document.addEventListener('keypress', function() {
  if(!started) {
    document.getElementById("level-title").innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

document.querySelectorAll(".btn").forEach(function(button) {
  button.addEventListener('click', function() {
    var userChosenColour = button.id;
    userPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length - 1);
  })
});

function checkAnswer(currentLevel) {
  if(simonPattern[currentLevel] === userPattern[currentLevel]) {
    
    if(userPattern.length === simonPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    document.getElementById("level-title").innerHTML = "Game Over. Press Any Key to Restart.";

    startOver();
  }
}

function animatePress(currentColor) {
  document.getElementById(currentColor).classList.add("pressed");

  setTimeout(function() {
    document.getElementById(currentColor).classList.remove("pressed");
  }, 100);
}

function nextSequence() {
  
  userPattern = [];
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  simonPattern.push(randomChosenColour);

  document.getElementById(randomChosenColour).classList.add("blink");

  setTimeout(() => {
    document.getElementById(randomChosenColour).classList.remove("blink");
  }, 150);
  playSound(randomChosenColour);
}  

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
  
function startOver() {
  level = 0;
  simonPattern = [];
  started = false;
}
