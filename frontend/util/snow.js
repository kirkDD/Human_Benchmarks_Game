
import Util from "./util.js"
// alert("af")
// how to make it snow?
// add some elements
console.log("it's snowing")

// add css
// use absolute path to css
var cssPath = Util.rootPath() + '/frontend/util/snow.css'
var head = document.getElementsByTagName('HEAD')[0];
head.innerHTML += '<link rel="stylesheet" href="' + cssPath + '">'
// add meat
var s_sky = document.createElement('div')
s_sky.className = 's_sky'
document.body.appendChild(s_sky)
for (var i = 0; i < 80; i++) {
  var spec = document.createElement('span')
  spec.style.left = Util.randVal(100) + '%'
  spec.style.animationDelay = Util.randVal(12) + 's'
  var w = 1 + Util.randVal(3)
  var h = w + Util.randVal(2)
  spec.style.width = 1 + w + 'px'
  spec.style.height = 1 + h + 'px'
  spec.style.animationDuration = 6 + (24 - w * h) + 's'
  s_sky.appendChild(spec)
}

var s_specs = document.querySelectorAll('.s_sky span')
// random jiggle
setInterval(() => {
  s_specs.forEach(spec => {
    var size = (parseInt(spec.style.width.replace('px', '')))
    size *= 2
    var dx = Util.randVal(20) * size
    var dy = Util.randVal(4) * size
    var scale = 0.5 + Util.randVal(0.5)
    spec.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'
      + 'scale(' + scale + ')'
    // spec.style.filter = 'blur(' + (scale/2) + 'px)'
    spec.style.backgroundColor = Util.RGBStr(
      40 + Util.randVal(215),
      40 + Util.randVal(215),
      40 + Util.randVal(215))
  })
}, 5000); // has to match css
