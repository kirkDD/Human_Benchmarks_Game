import Util from "../util/util.js"

const column_area = document.getElementById('column-area')
let MAX = null
let MIN = null

function createLevel(numColumns) {
  // clear content
  column_area.innerHTML = ''
  for (let i = 0; i < numColumns; i++) {
    // new bar
    let bar = document.createElement('div')
    // add to DOM
    column_area.appendChild(bar)
    bar.className = 'column'
    bar.addEventListener('click', barClicked)
    bar.addEventListener('touchstart', barClicked) // mobile
    bar.style.width = 100 / numColumns + '%'
    // inner bar
    let innerBar = document.createElement('div')
    bar.appendChild(innerBar)
    innerBar.style.height = '0%'
    // style the column
    innerBar.style.backgroundColor = Util.RGBStr(
      40 + 215 * Math.random(),
      40 + 215 * Math.random(),
      40 + 215 * Math.random())
    // for css drop shadow
    innerBar.style.color = innerBar.style.backgroundColor
  }
  // actual value
  // make random numbers and show them
  window.setTimeout(() => {
    MAX = 0
    MIN = 100
    document.querySelectorAll('.column div').forEach(innerBar => {
      let randVal = Math.floor(Math.random() * 40) * 2 + 20
      MAX = Math.max(MAX, randVal)
      MIN = Math.min(MIN, randVal)
      innerBar.style.height = randVal + '%'
      innerBar.myRandVal = randVal
    });
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
    e.style.filter = 'brightness(40%)'
  } else if (MIN === e.myRandVal) {
    MIN = -1
    e.style.filter = 'brightness(40%)'
  } else {
    e.style.filter = 'brightness(10%)'
    numErrorClicks++
  }
  // show its clicked
  if (MAX === -1 && MIN === -1) {
    // done
    completeLevel()
  }
}

function completeLevel() {
  // complete when currentLevel == 8
  if (currentLevel === 8) {
    endGame()
  } else {
    levelEle.innerText = ++currentLevel
    createLevel(NUM_BAR++)
  }
}

let START_TIME = null
let NUM_BAR = 10
let timeSpent = 0
let currentLevel = 1
let numErrorClicks = 0
const timeEle = document.querySelectorAll('#time span')[0]
const levelEle = document.querySelectorAll('#level span')[0]
const hintEl = document.getElementById('hint')
let timerIDSec = null
function startGame() {
  // hide hint text
  hintEl.style.opacity = 0
  // start fresh
  clearInterval(timerIDSec)
  NUM_BAR = 10
  currentLevel = 1
  numErrorClicks = 0
  timeSpent = 0
  // display
  levelEle.innerText = currentLevel
  timeEle.innerText = timeSpent
  // start counting
  timerIDSec = setInterval(() => {
    timeEle.innerText = ++timeSpent
    if (timeSpent > 30) { // too much time spent
      // end game
      endGame()
    }
  }, 1000)
  START_TIME = Date.now()  // track time
  createLevel(NUM_BAR)
}

function endGame() {
  // clear and show score
  let totalTime = Date.now() - START_TIME
  clearInterval(timerIDSec)
  column_area.innerHTML = ''
  hintEl.innerText = 'Total Time: ' +
    Math.floor(totalTime / 1000) + "." +
    (totalTime % 1000) + 's'
  hintEl.style.opacity = 1
  // send data to server
  // a post request by server design
  Util.sendResult("minandmax", totalTime + numErrorClicks)
}

// hook up listeners
document.getElementById('start-button').onclick = startGame


// draw game stats
let graphEl = document.querySelector('svg.stat-graph')
console.log(graphEl)
// data is [{}, {}]
function populateGraph(dataArr) {
  console.log(dataArr)
}

// test graph
let phpUrl = "http://students.washington.edu/leol15" +
  "/x/Human_Benchmarks_Game/backend/php/server.php"
fetch(phpUrl + "?game_name=minandmax")
  .then(data => data.json())
  .then(json => populateGraph(json))
