// var fs = require("fs")
const MainPane = require('./js/view/view')
// initial filelist after html loaded
var mainpane = new MainPane()
window.onload = function () {
  mainpane.refresh()
}

// window resize
window.onresize = function () {
  // Pane.resetWindowHeight()
}

// kd = new keydown()
document.onkeydown = function (event) {
  // key event action
  // kd.ini(event, mainp)
}

// function filter () {
//   kd.filter(mainp.activepane)
// }

window.onclose = function () {
  // dirlog.writDirs()
  // dirlog.test()
}

// k2 = new qcmd.quickcmd('new folder')
// k2.newfolder('c:/users/harvey/onedrive/n2n')
