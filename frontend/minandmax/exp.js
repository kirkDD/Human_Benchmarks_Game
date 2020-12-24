

console.log("debugging")

const column_area = document.getElementById('column-area')
var MAX = null
var MIN = null
// var START_TIME = null

function createLevel(numColumns) {
  // clear content
  column_area.innerHTML = ''
  for (var i = 0; i < numColumns; i++) {
    // new bar
    var bar = document.createElement('div')
    // add to DOM
    column_area.appendChild(bar)
    bar.className = 'column'
    bar.addEventListener('click', barClicked)
    bar.style.width = 100 / numColumns + '%'
    // inner bar
    var innerBar = document.createElement('div')
    bar.appendChild(innerBar)
    innerBar.style.height = '0%'
    // style the column
    innerBar.style.backgroundColor = colorToString(255 * Math.random(), 200, 255 * Math.random())
    // for css drop shadow
    innerBar.style.color = innerBar.style.backgroundColor 
  }
  // actual value
  // make random numbers and show them
  window.setTimeout(() => {
    MAX = 0
    MIN = 100
    document.querySelectorAll('.column div').forEach(innerBar => {
      var randVal = Math.floor(Math.random() * 40) * 2 + 20
      MAX = Math.max(MAX, randVal)
      MIN = Math.min(MIN, randVal)
      innerBar.style.height = randVal + '%'
      innerBar.myRandVal = randVal
    });
    // START_TIME = Date.now()  // track time
  }, 60)  // wait some time for animation

}

function barClicked(e) {
  // could click outside of color bars
  if (e.target.className !== '') {
    e = e.target.firstChild
  } else {
    e = e.target
  }
  // check if max and min are both clicked
  if (MAX === e.myRandVal) {
    MAX = -1
  } else if (MIN === e.myRandVal) {
    MIN = -1
  } else {
    numErrorClicks++
  }
  // show its clicked
  e.style.filter = 'brightness(0.3)'
  if (MAX === -1 && MIN === -1) {
    // done
    completeLevel(Date.now())
  }
}

function completeLevel(timeSpent) {
  // console.log(timeSpent)
  levelEle.innerText = ++currentLevel
  createLevel(NUM_BAR++)
}

var NUM_BAR = 10
var timerID = null
var timeLeft = 0
var currentLevel = 1
var numErrorClicks = 0
const timeEle = document.getElementById('time')
const levelEle = document.querySelectorAll('#level span')[0]
function startGame() {
  // hide hint text
  document.getElementById('hint').style.opacity = 0
  // start fresh
  clearInterval(timerID)
  NUM_BAR = 10
  timeLeft = 30
  currentLevel = 1
  numErrorClicks = 0
  // display
  levelEle.innerText = currentLevel
  timeEle.innerText = 'Countdown: ' + timeLeft
  // start counting
  timerID = setInterval(() => {
    timeLeft -= 1
    timeEle.innerText = 'Countdown: ' + timeLeft
    if (timeLeft === 0) {
      clearInterval(timerID)
      // end game
      endGame()
    }
  }, 1000)
  createLevel(NUM_BAR++)
}

function endGame() {
  // clear and show score
  column_area.innerHTML = ''
  var hintEl = document.getElementById('hint')
  hintEl.innerText = 'Score: ' +
    (currentLevel - numErrorClicks)
  hintEl.style.opacity = 1
}

// helpers
var colorToString = (r, g, b) => { return 'rgb(' + r + ',' + g + ',' + b + ')'}
