

console.log("debugging")

const column_area = document.getElementById('column-area')
var MAX = null
var MIN = null
var START_TIME = null

function initGame(numColumns) {
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
  }
  // actual value
  // make random numbers and show them
  window.setTimeout(() => {
    MAX = 0
    MIN = 100
    document.querySelectorAll('.column div').forEach(innerBar => {
      var randVal = Math.floor(Math.random() * 80) + 20
      MAX = Math.max(MAX, randVal)
      MIN = Math.min(MIN, randVal)
      innerBar.style.height = randVal + '%'
      innerBar.myRandVal = randVal
    });
    START_TIME = Date.now()  // track time
  }, 100)  // wait 100ms

}

function barClicked(e) {
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
  }
  // show its clicked
  e.style.filter = 'brightness(0.3)'
  if (MAX === -1 && MIN === -1) {
    // done
    completeRound(Date.now() - START_TIME)
  }
}

function completeRound(timeSpent) {
  console.log(timeSpent)
  initGame(15)
}

// helpers
var colorToString = (r, g, b) => { return 'rgb(' + r + ',' + g + ',' + b + ')'}


initGame(15)
