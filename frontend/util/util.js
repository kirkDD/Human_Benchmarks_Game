
class Util {

  RGBStr = (r=0, g=0, b=0, a=1) => {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  rootPath = () => {
    const repoName = "Human_Benchmarks_Game"
    var rootIndex = window.location.href.indexOf(repoName)
    return window.location.href.substr(0,
      rootIndex + repoName.length + 1)
  }

  randVal = (upper, round=false) => {
    if (round) {
      return Math.round(Math.random() * upper)
    } else {
      return Math.random() * upper
    }
  }

  sendResult = (game_name, score) => {
    fetch(this.rootPath() + "/backend/php/server.php", {
      method: 'POST',
      body: JSON.stringify({
        game_name: game_name,
        score: score
      })
    })
  }

  fetchGameData(game_name, limit=50) {
    // intelligent fetch?
    if (this.rootPath() === "http://127.0.0.1:3000") {
      // local!
      return fetch("http://students.washington.edu/leol15" +
        "/x/Human_Benchmarks_Game/backend/php/server.php?" +
        "game_name=" + game_name + "&limit=" + limit)
    } else {
      return fetch(this.rootPath() + "/backend/php/server.php?"+
      "game_name=" + game_name + "&limit=" + limit)
    }
  }

  createSvgEl(tag_name, attrs) {
    let svgEl = document.createElementNS("http://www.w3.org/2000/svg", tag_name);
    for (const [key, value] of Object.entries(attrs)) {
      svgEl.setAttribute(key, value)
    }
    return svgEl
  }

  formatUnixTime(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    if ((hour + "").length == 1) hour = "0" + hour
    var min = a.getMinutes();
    if ((min + "").length == 1) min = "0" + min
    var sec = a.getSeconds();
    if ((sec + "").length == 1) sec = "0" + sec
    var time = month + ' ' + date + ' ' + year + ', ' + hour + ':' + min + ':' + sec ;
    return time;
  }

}

export default new Util();
