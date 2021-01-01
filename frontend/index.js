
import Util from "./util/util.js"

// fetch and dump stats into table
// reaction_speed
function createTable() {
  console.log(dataPool);
  // use dataPool
  let tableEl = document.createElement("table")
  tableEl.className = 'data-dump-table'
  let legendRow = document.createElement("tr")
  legendRow.innerHTML = "<th>Score</th><th>Time</th><th>Score</th><th>Time</th>"
  tableEl.appendChild(legendRow)
  tableEl.innerHTML += "<tr><td>" + dataPool[0][1] +
    "</td><td></td><td>" + dataPool[1][1] + "</td><td></td></tr>"
  for (let i = 0; i < Math.max(dataPool[0][0].length, dataPool[1][0].length); i++) {
    let o0 = dataPool[0][0][i]
    let o1 = dataPool[1][0][i]
    let row = document.createElement('tr')
    if (o0) {
      row.innerHTML += "<td>" + o0.score + "</td>"
      row.innerHTML += "<td>" + Util.formatUnixTime(o0.server_time) + "</td>"
    } else {
      row.innerHTML += "<td></td><td></td>"
    }
    if (o1) {
      row.innerHTML += "<td>" + o1.score + "</td>"
      row.innerHTML += "<td>" + Util.formatUnixTime(o1.server_time) + "</td>"
    } else {
      row.innerHTML += "<td></td><td></td>"
    }
    tableEl.appendChild(row)
  }

  // add to body
  document.body.appendChild(tableEl)

}

let dataPool = []

Util.fetchGameData("clickReaction")
  .then(data => data.json())
  .then(json => {
    dataPool.push([json, "reaction_speed"])
    if (dataPool.length === 2) {
      createTable()
    }
  })
Util.fetchGameData("minandmax")
  .then(data => data.json())
  .then(json => {
    dataPool.push([json, "minandmax"])
    if (dataPool.length === 2) {
      createTable()
    }
  })
