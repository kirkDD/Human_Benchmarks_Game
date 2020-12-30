// javascript practice
var clickArea = document.getElementById("click_area");
var turnedGreen;
var startTime;
var endTime;
// to keep track of average
var totalScore = 0.0;
var numTry = 0;
var timer = null;
var backgroundColor = 'rgb(' + 0 + ',' + 29 + ',' + 42 + ')';
// start the game after user clicks the button
function startGame() {
    turnedGreen = false;
    clickArea.innerHTML = "Wait for green...";
    clickArea.style.background = "Brown";
    // turns green after a random time period between 2s and 6s
    var randomTime =  Math.random() * 4000 + 2000;
    var greenTimer = setTimeout(turnGreen, randomTime);
    timer = greenTimer;
    // change mousedown listener
    clickArea.onmousedown = redOnMousedown;
}

function redOnMousedown() {
    endTime = new Date().getTime();
    if (timer != null)
        clearTimeout(timer);
    // clicked before it turns green
    if (!turnedGreen) {
        clickArea.innerHTML = "Clicked too soon!<br>Click to keep going";
    } else {
        totalScore += (endTime - startTime);
        numTry++;
        var text = "" + (endTime - startTime) + " ms<br>Click to keep going";
        clickArea.innerHTML = text;
        var avg = (totalScore / numTry).toFixed(2);
        document.getElementById("average_time").innerHTML = "Average: " + avg + "ms";
        document.getElementById("num_tries").innerHTML = "Attempts: " +numTry;
        sendScore("clickReaction", endTime - startTime) // send individual scores
    }
    clickArea.style.background = backgroundColor;
    // set onmousedown to restart game
    clickArea.onmousedown = startGame;
}

function turnGreen() {
    turnedGreen = true;
    clickArea.style.background = 'rgb(' + 138 + ',' + 190 + ',' + 40 + ')';;
    clickArea.innerHTML = "Now!!!";
    startTime = new Date().getTime();
}
// listener for when clear button is clicked
function clearFun() {
    totalScore = 0.0;
    numTry = 0;
    if (timer != null)
        clearTimeout(timer);
    homeScreen();
}

function homeScreen() {
    clickArea.innerHTML = "When the red box turns green, "
    + "CLICK!<br>Click anywhere to start";
    document.getElementById("average_time").innerHTML = "Average: NONE";
    document.getElementById("num_tries").innerHTML = "Attempts: 0";
    clickArea.onmousedown = startGame;
    clickArea.style.background = backgroundColor;
}

function sendScore(gameName, score) {
  fetch("../../backend/php/server.php", {
    method: 'POST',
    body: JSON.stringify({
      game_name: gameName,
      score: score
    })
  })
}
