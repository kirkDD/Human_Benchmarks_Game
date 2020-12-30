
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
    return fetch(this.rootPath() + "/backend/php/server.php?"+
      "game_name=" + game_name + "&limit=" + limit)
  }

  createSvgEl(tag_name, attrs) {
    let svgEl = document.createElementNS("http://www.w3.org/2000/svg", tag_name);
    for (const [key, value] of Object.entries(attrs)) {
      svgEl.setAttribute(key, value)
    }
    return svgEl
  }

}

export default new Util();
