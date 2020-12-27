// javascript practice
var clickArea = document.getElementById("click_area");
// start the game after user clicks the button
function startGame() {
    clickArea.innerHTML = "Wait for green...";
    clickArea.style.background = "Brown";
    var randomTime =  Math.random() * 7000 + 3000;
    setTimeout(turnGreen, randomTime);
    clickArea.onclick = redOnclick;
}

function redOnclick() {
}

function turnGreen() {
    clickArea.style.background = "Aquamarine";
    clickArea.innerHTML = "Now!!!";
}