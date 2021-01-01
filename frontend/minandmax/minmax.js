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
// data is [{score: , server_time: }, {}]
function populateGraph(dataArr, numBins) {
  console.log(dataArr.length, "data")
  // bucket the data, ignore the time
  let max = -1e9
  let min = 1e9
  dataArr.forEach((item, i) => {
    if (item.score > 1000)
      item.score /= 1000
    max = Math.max(max, item.score)
    min = Math.min(min, item.score)
  });
  let newmax = Math.ceil(max / 100) * 100
  if (newmax - max > 50) {
    max = newmax - 50
  } else {
    max = newmax
  }
  min = Math.floor(min / 100) * 100
  let binWidth = (max - min) / numBins  // + 1 for floor
  let bins = []
  let bin_markers = []
  for (let i = 0; i < numBins; i++) {
    bins.push(0)
    bin_markers.push(Math.round(min + i * binWidth))
  }
  dataArr.forEach((item, i) => {
    let idx = Math.floor((item.score - min) / binWidth)
    bins[idx]++
  });
  // draw bins
  graphHistogram(bins, bin_markers, 800, 300)
}

// graph area width & height
function graphHistogram(hist, bin_labels, width, height) {
  let max = -1e9
  hist.forEach((item, i) => {
    max = Math.max(max, item)
  });
  // draw a percent of max
  let barMaxHeight = Math.max(height * 0.8, height - 50)
  let barBottom = height * 0.9
  let drawingW = width * 0.8
  let barWidth = drawingW / hist.length
  for (let i = 0; i < hist.length; i++) {
    let x = (i + 0.5) * barWidth + 0.1 * width
    let txtEl = Util.createSvgEl("text", {x: x - 10, y: height - 5})
    txtEl.innerHTML = Math.round(bin_labels[i])
    graphEl.appendChild(txtEl)
    // top of bar
    let attrs = {"stroke-width": barWidth - 2,
      x1: x, y1: barBottom,
      x2: x, y2: barBottom - (barMaxHeight * (hist[i] / max))}
    let rectAttr = {x: x - barWidth / 2 + 5,
      y: barBottom - (barMaxHeight * (hist[i] / max)),
      width: barWidth - 4, height: (barMaxHeight * (hist[i] / max))}
    let barEl = Util.createSvgEl("rect", rectAttr)
    graphEl.appendChild(barEl
    )
  }

  // draw the left legend using 10% width
  for (let i = 0; i < max + 1; i++) {
    let txtEl = Util.createSvgEl("text", {x: 0.05 * width,
      y: barBottom - barMaxHeight * (i / max),
      "font-size": '2em'})
    txtEl.innerHTML = i
    graphEl.appendChild(txtEl)
  }
}

// test graph
if (Util.rootPath() === "http://127.0.0.1:3000") {
  let phpUrl = "http://students.washington.edu/leol15" +
  "/x/Human_Benchmarks_Game/backend/php/server.php"
  fetch(phpUrl + "?game_name=clickReaction") // clickReaction
  .then(data => data.json())
  .then(json => populateGraph(json, 15))
}

// draw graphHistogram
fetch(Util.rootPath() + "/backend/php/server.php?game_name=minandmax")
  .then(data => data.json())
  .then(json => populateGraph(json, 15))
  .catch(e => console.log(e))
