// var fs = require("fs")

var dirnow = ['C:/Users/', 'C:/'] // file dir for left and right pane.
// var cursorPosition={"left":0, "right":0};   //the order number of file selected for each pane.

// var fm = require("./js/fman");
var Pane = require('./js/pane')

// var fmanleft = new fman("left");
// var fmanright = new fman("right");
var leftpane = new Pane('left', dirnow[0])
var rightpane = new Pane('right', dirnow[1])

// initial filelist after html loaded
window.onload = function () {
  leftpane.ini()
  rightpane.ini()
  // rightpane.inactive();
}

// window resize
window.onresize = function () {
  Pane.resetWindowHeight()
}

// which pane is active
window.onclick = function () {
  if (Pane.activepane === leftpane.whichPane) {
    rightpane.inactive()
  } else {
    leftpane.inactive()
  }
}
