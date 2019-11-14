var fs = require("fs")
var exec = require('child_process').exec;


var dirnow=["C:/Users/","C:"];         //file dir for left and right pane.
var cursorPosition=[0,0];   //the order number of file selected for each pane.
var key=1;                  //0:left pan, 1:right pan; initialize right fistly
var filterStr=["",""];      //fileter string for each pane

var fm = require("./js/fman");
var pane = require("./js/pane");

var fmanleft = new fm("left");
var fmanright = new fm("right");
var leftpane = new pane(fmanleft);
var rightpane = new pane(fmanright);


// initial filelist after html loaded
window.onload=function(){
    leftpane.ini(dirnow[0]);
    rightpane.ini(dirnow[1]);

    // var dirnowL="C:/Users/";
    // var dirnowR="C:/Users/";
    // dirnow=[dirnowL,dirnowR];
    // showList(dirnow[key]);
}

//window resize
window.onresize=function(){
    fm.resetWindowHeight()
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

