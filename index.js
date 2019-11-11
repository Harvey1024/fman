var fs = require("fs")
var exec = require('child_process').exec;


var dirnow=["",""];
var cursorPosition=[0,0];
var key=1; //0:left pan, 1:right pan; initialize right fistly

var filterStr=["",""];

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
}

//window resize
window.onresize=function(){
    // get window height
    let windowheight =this.document.documentElement.clientHeight
    var sectionelem=this.document.getElementsByTagName("section")
    // set <main> height
    this.document.getElementsByTagName("main")[0].style.height=windowheight.toString()+"px"
    // set <section> height
    sectionelem[0].style.height=(windowheight-93).toString()+"px";
    this.console.log((windowheight-93).toString()+"px")
    sectionelem[1].style.height=(windowheight-93).toString()+"px";

    // let cmdmargintop=h*0.3
    // let cst=cmdmargintop.toString()

    // this.document.getElementsByClassName("cmdw")[0].style.margin = (h*0.3).toString()+"px auto"
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

