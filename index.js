// var fs = require("fs")

var dirnow = ['C:/', 'C:/users/harvey/onedrive/n2n/'] // file dir for left and right pane.
const qcmd = require('./js/quickcmd')
// var cursorPosition={"left":0, "right":0};   //the order number of file selected for each pane.
var keydown = require('./shortcut')
// var inputFilter = require('./shortcut')
// var fm = require("./js/fman");
var Pane = require('./js/pane')
const mainpan = require('./js/mainpane')
var mainp = new mainpan(dirnow)
// var leftpane = new Pane('left', this.dirnow[0])
// var rightpane = new Pane('right', this.dirnow[1])

// var fmanleft = new fman("left");
// var fmanright = new fman("right");
// var leftpane = new Pane('left', dirnow[0])
// var rightpane = new Pane('right', dirnow[1])

// initial filelist after html loaded
var dirlog = new qcmd.dirSumList()
window.onload = function () {
  mainp.creatpane()
  mainp.activepane = mainp.leftpane

  dirlog.readDirs()
  // mainp.addpaneOnclick()
  // rightpane.inactive();
}

// window resize
window.onresize = function () {
  Pane.resetWindowHeight()
}

// which pane is active
// window.onclick = function () {
  // if (Pane.activepane === mainp.leftpane.whichPane) {
  //   mainp.rightpane.inactive()
  // } else {
  //   mainp.leftpane.inactive()
  // }
// }
kd = new keydown()
document.onkeydown = function (event) {
  // key event action
  kd.ini(event, mainp)
}

function filter(){
  kd.filter(mainp.activepane)
}

window.onclose = function () {
  dirlog.writDirs()
}

// k2 = new qcmd.quickcmd('new folder')
// k2.newfolder('c:/users/harvey/onedrive/n2n')