// var fs = require("fs")
const MainPane = require('./js/view/view')
const KeyboardHander = require('./js/command/commands')
// const KeyboardHander = require('./js/command/keyboard')

// initial filelist after html loaded
var mainpane = new MainPane()
window.onload = function () {
  mainpane.refresh()
}

// window resize
window.onresize = function () {
  // Pane.resetWindowHeight()
}

// const keyHander = new KeyboardHander(mainpane)
const keyHander = KeyboardHander(mainpane)
document.onkeydown = function (event) {
  // key event action
  // console.log(event)
  keyHander.hander(event)
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
