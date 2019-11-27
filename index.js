var fs = require("fs")
var exec = require('child_process').exec;


var dirnow=["C:/Users/","C:/"];         //file dir for left and right pane.
// var cursorPosition={"left":0, "right":0};   //the order number of file selected for each pane.
var filterStr={"left":0, "right":0};      //fileter string for each pane

// var fm = require("./js/fman");
var pane = require("./js/pane");

// var fmanleft = new fman("left");
// var fmanright = new fman("right");
var leftpane = new pane("left",dirnow[0]);
var rightpane = new pane("right",dirnow[1]);


// initial filelist after html loaded
window.onload=function(){
    leftpane.ini();
    rightpane.ini();
    // rightpane.inactive();
}

//window resize
window.onresize=function(){
    pane.resetWindowHeight()
}

// which pane is active
window.onclick = function(){
    if(pane.activepane == leftpane.whichPane){
        rightpane.inactive();
    }
    else{
        leftpane.inactive();
    }
}
