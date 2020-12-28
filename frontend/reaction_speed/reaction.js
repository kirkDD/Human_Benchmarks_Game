// javascript practice
var clickArea = document.getElementById("click_area");
var turnedGreen;
var startTime;
var endTime;
// to keep track of average
var totalScore = 0.0;
var numTry = 0;
var timer = null;
// start the game after user clicks the button
function startGame() {
    turnedGreen = false;
    clickArea.innerHTML = "Wait for green...";
    clickArea.style.background = "Brown";
    // turns green after a random time period between 2s and 6s
    var randomTime =  Math.random() * 4000 + 2000;
    var greenTimer = setTimeout(turnGreen, randomTime);
    timer = greenTimer;
    // change the onclick
    clickArea.onclick = redOnclick;
}

function redOnclick() {
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
        var avg = (totalScore / numTry).toFixed(2);
        text += "<br><br>Average in " + numTry
        + (numTry < 2? " try: " : " tries: ") + avg + "ms";
        clickArea.innerHTML = text;
    }
    clickArea.style.background = 'rgb(' + 57 + ',' + 184 + ',' + 243 + ')';
    // set onclick to restart game
    clickArea.onclick = startGame;
}

function turnGreen() {
    turnedGreen = true;
    clickArea.style.background = "Aquamarine";
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
    clickArea.onclick = startGame;
    clickArea.style.background = 'rgb(' + 57 + ',' + 184 + ',' + 243 + ')';
}
