// javascript practice
var clickArea = document.getElementById("click_area");
var turnedGreen;
var startTime;
var endTime;
// start the game after user clicks the button
function startGame() {
    turnedGreen = false;
    clickArea.innerHTML = "Wait for green...";
    clickArea.style.background = "Brown";
    // turns green after a random time period between 2s and 6s
    var randomTime =  Math.random() * 4000 + 2000;
    var greenTimer = setTimeout(turnGreen, randomTime);
    // change the onclick
    clickArea.onclick = () => redOnclick(greenTimer);
}

function redOnclick(timer) {
    endTime = new Date().getTime();
    clearTimeout(timer);
    // clicked before it turns green
    if (!turnedGreen) {
        clickArea.innerHTML = "Clicked too soon!<br>Click to keep going";
    } else {
        clickArea.innerHTML = "" + (endTime - startTime) + " ms<br>Click to keep going";
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
