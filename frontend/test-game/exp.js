

console.log("debugging")

const column_area = document.getElementById('column-area')


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
    bar.index = i
    // inner bar
    var innerBar = document.createElement('div')
    bar.appendChild(innerBar)
    innerBar.style.height = '50%'
    innerBar.style.backgroundColor = colorToString(255 * Math.random(), 255 * Math.random(), 0)
    // color it

    // actual value
  }
  // style the columns
}

function barClicked(e) {
  console.log(e.target.index)
}

// helpers
var colorToString = (r, g, b) => { return 'rgb(' + r + ',' + g + ',' + b + ')'}


initGame(15)
