var fs = require("fs")
var exec = require('child_process').exec;


var dirnow=["C:/Users/","C:/"];         //file dir for left and right pane.
var cursorPosition={"left":0, "right":0};   //the order number of file selected for each pane.
var key=1;                  //0:left pan, 1:right pan; initialize right fistly
var filterStr=["",""];      //fileter string for each pane

// var fman = require("./js/fman");
var pane = require("./js/pane");

// var fmanleft = new fman("left");
// var fmanright = new fman("right");
var leftpane = new pane("left");
var rightpane = new pane("right");


// initial filelist after html loaded
window.onload=function(){
    leftpane.ini(dirnow[0],cursorPosition);
    rightpane.ini(dirnow[1],cursorPosition);

    // var dirnowL="C:/Users/";
    // var dirnowR="C:/Users/";
    // dirnow=[dirnowL,dirnowR];
    // showList(dirnow[key]);
}

//window resize
window.onresize=function(){
    fman.resetWindowHeight()
}

// var EventEmitter = require('events').EventEmitter;
// var event = new EventEmitter();
// event.on('some_event', function() {

//     key=0; //init left pan
//     console.log('some_event 事件触发k=%d',key);

//     showList(dirnow[key]);
// });

// setTimeout(function() {
//     event.emit('some_event');
// }, 80);

