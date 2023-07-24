var playing = false;
var action;
var cardSlot = 0;
var timeRemaining;
var largeArray = [25, 50, 75, 100];
var ready = false;
shuffleLarge();

var smallArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
shuffleSmall();

//Start countdown
document.getElementById('start_button').disabled = true;

document.getElementById("start_button").onclick = function(){
  if (ready === false) {
    alert('Please use more numbers');
    return;
  }
    if(playing == true){
        location.reload();
    }else{        
        playing = true;
        timeRemaining = 30;
        document.getElementById("start_button").innerHTML = "Reset";
        setTimeout(function(){
            startCountdown();
            play();
        }, 3000);
        genTarget();
        hide("card_selection_box");
        show("counter_box");
    }
}

function gameReady() {
  const cardSlotsNodes = document.querySelectorAll('.box');
  const length = cardSlotsNodes.length - 1;
  // this is just because nodelist (unlike an array) counts from 1

  if (cardSlotsNodes[length].innerHTML) {
    ready = true;
  }
}

//Click on small number button to generate a random small number
document.getElementById("small_number_card").onclick = function(){
    genSmallNumber();
    gameReady();
}

//Click on large number button to generate a random large number
document.getElementById("large_number_card").onclick = function(){
    genLargeNumber();
    gameReady()
}


//FUNCTIONS//

//Start countdown
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("counter_value").innerHTML = timeRemaining;
        if(timeRemaining == 0){
            stopCountdown();
            playing = false;
            document.getElementById("start_button").onclick = function(){
                location.reload();
            }            
        }
    }, 1000);
}

//Play countdown themetune
function play(){
    var audio = document.getElementById("audio").play();
}

//Stop countdown
function stopCountdown(){
    clearInterval(action);
}

//Generate target number between 100-999
function genTarget(){
    var targetNumber = 101+ Math.floor(Math.random()*899);
    document.getElementById("target").innerHTML = targetNumber;
}

//Generate random small number from array
function genSmallNumber(){
    var smallNumber = smallArray[0];
    smallArray.splice(0, 1);
    var answersS = [];
    if(smallArray.length == 0){
        smallArray.push(answersS);
    }
    cardSlot += 1;
    document.getElementById("box"+cardSlot).innerHTML = smallNumber;
}

//Generate random large number from array
function genLargeNumber(){
    if (largeArray.length < 1) {
      return;
    }

    console.log('executing code');
    var largeNumber = largeArray[0];
    largeArray.splice(0, 1);
    // var answersL = [];
    // if(largeArray.length == 0){
    //     largeArray.push(answersL);
    // }
    cardSlot += 1;
    document.getElementById("box"+cardSlot).innerHTML = largeNumber;
}

//Shuffle arrays
function shuffleLarge(){
    var i, j, k;
    for (i = largeArray.length -1; i > 0; i--){
        j = Math.floor(Math.random() * i)
        k = largeArray[i]
        largeArray[i] = largeArray[j]
        largeArray[j] = k
    }
}

function shuffleSmall(){
    var i, j, k;
    for (i = smallArray.length -1; i > 0; i--){
        j = Math.floor(Math.random() * i)
        k = smallArray[i]
        smallArray[i] = smallArray[j]
        smallArray[j] = k
    }
}

//Hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//Show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}