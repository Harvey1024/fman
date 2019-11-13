var fs = require("fs")
var exec = require('child_process').exec;


var dirnow=["",""];
var cursorPosition=[0,0];
var key=1; //0:left pan, 1:right pan; initialize right fistly

var filterStr=["",""];

var fm = require("./js/fman");
var pane = require("./js/pane");

var fman = new fm();
// require("./js/command")
// require("./js/getelement")
// require("./js/shortcut")
// require("./js/component")

// initial filelist after html loaded
window.onload=function(){
    var dirnowL="C:/Users/";
    var dirnowR="C:/Users/";
    dirnow=[dirnowL,dirnowR];
    showList(dirnow[key]);
    // showList(dirnow[0]);
}

//window resize

window.onresize=function(){
    fman.resetWindowHeight()
}
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function() {

    key=0; //init left pan
    console.log('some_event 事件触发k=%d',key);

    showList(dirnow[key]);
});

setTimeout(function() {
    event.emit('some_event');
}, 80);

