userClickedPattern = []
gamePattern = []
buttonColors = ["red", "blue", "green", "yellow"]

var level = 0
var started = false
for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour)
        animatePress(userChosenColour)

        checkAnswer(userClickedPattern.length - 1)
    })
}

// //1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// $(".btn").click(function() {

//     //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
//     var userChosenColour = $(this).attr("id");

//     //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
//     userClickedPattern.push(userChosenColour);
//     playSound(userChosenColour)
//     //console.log(userClickedPattern);

//   });

document.addEventListener("keypress", function () {
    if (!started) {
        document.querySelector("#level-title").innerHTML = "Level" + " " + level
        nextSequence()
        started = true
    }


});


function nextSequence() {
    userClickedPattern = []
    level++;
    document.querySelector("#level-title").innerHTML = "Level" + " " + level

    var rand = Math.floor(Math.random() * 4)

    var randomChosenColour = buttonColors[rand]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");
        playSound("wrong")
        document.querySelector("body").classList.add("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver()
    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    document.querySelector("#" + currentColor).classList.add("pressed")
    setTimeout(function () {
        document.querySelector("#" + currentColor).classList.remove("pressed")
    }, 100);
}

function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }





// nextSequence()

// console.log(userClickedPattern)



