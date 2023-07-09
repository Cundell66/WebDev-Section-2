const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function buttonFlash(itemColour)
    {
        var item = "." + itemColour;
        $(item).toggleClass("pressed");
        colourSound(itemColour);
        setTimeout(function () {
            $(item).toggleClass("pressed");
        }, 100);
        
    }

function nextSequence()
    {
        userClickedPattern = [];
        level ++;
        $("h1").text("Level " + level);
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        // console.log(randomChosenColour);
        buttonFlash(randomChosenColour);
        $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    }    

function colourSound(buttonColour) {
        var audio = new Audio('sounds/' + buttonColour + '.mp3');
        audio.play();        
    }

function checkAnswer(currentLevel){
        // console.log("game" + this.gamePattern[currentLevel] + "user" + this.userClickedPattern[currentLevel]);
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            // console.log("success");
            if(gamePattern.length === userClickedPattern.length){
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        }
        else
        {
            // console.log("wrong");
            colourSound("wrong");
            $("body").toggleClass("game-over"); 
            setTimeout(function(){
                $("body").toggleClass();             
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();      
        }
    }

function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }


$(".btn").on("click", function(event){
            var userChosenColour = this.id;
            userClickedPattern.push(userChosenColour);
            buttonFlash(userChosenColour);
            // console.log(userClickedPattern);
            checkAnswer(userClickedPattern.length-1);
        }
    );

$(document).keydown(function(event){
        if (!started){
            // console.log("key pressed");
            // console.log(started);
            $("h1").text("Level " + level);
            nextSequence();
            started = true;
            }
        }
    );