var fs = require("fs")
var exec = require('child_process').exec;

var dirnow=["",""];
var cursorPosition=[0,0];
var key=1; //0:left pan, 1:right pan; initialize right fistly

var filterStr=["",""];

require("./js/command")
require("./js/getelement")
require("./js/shortcut")
require("./js/component")
require("./js/display")

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




// input dir show filelist on windows
function showList(directory){
    //read dircectory
    fs.readdir(directory,function(err, files){
        if (err) {
            return console.error(err);
        }
        // filter hiden file
        files=files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        // files=files.filter(item => !(".regtrans-ms").test(item));
        //show filelist in html
        var filescopy=files;
        for(let i=0, k=0;i<files.length;i++,k++){
            if(files[k].slice(-11,files[k].length)=="regtrans-ms"||files[k].slice(-4,files[k].length)==".blf"){
                filescopy.splice(k,1);
                k=k-1;
                console.log("brhgin"+files[i])
            }
        }
        files=filescopy;
        var fileListTable=document.getElementsByClassName("inflist");
        if(!key){
            var listTable=fileListTable[1]; //left
        }
        else{
            var listTable=fileListTable[3]; //right
        }
        // show file and folder in html
        filetoHtml(listTable,files);
        sizeAndDateToHtml(directory);
        showdirheader(directory);
        filedblclickfun(); //link ondblclick filedblclickfun() should be in call back function
        clickfun();
        clearBothBG();
        resetCursor();
        refreshDirnow();
        // cursorBG(cursorPosition[key],"#49483e"); //init background
    });
    console.log("finished show list");
}
//show dir header
function showdirheader(directory){
    if(!key){
        var dirheaderid="leftdir";
    }
    else{
        var dirheaderid="rightdir";
    }
    document.getElementById(dirheaderid).innerHTML=directory;
}
// transform array to html table, return html string
function filetoHtml(listTable,files){
    var filestring="";
    var namestring = "";
    var sizesting = "";
    var datestring = "";
    if(!key){
        var filenameclass="nameL"
        var filenameidtep="Lfile"
    }
    else{
        var filenameclass="nameR"
        var filenameidtep="Rfile"
    }
    for(var i=0, k=0; i<files.length;i++){
        if(files[i][0]!="." && files[i][0]!="$"){   //hide hiden files
            var fileid=filenameidtep+k.toString();
            k++;
            namestring = "<td class='"+filenameclass+"'"+"id="+ fileid+">"+files[i]+"</td>";
            filestring += "<tr>"+namestring +"</tr>"
        }
    }
    listTable.innerHTML=filestring;
}
function insertSting(str,initposition, insertstr){
    //insert insertstr into str from initposition
    var strtmpl=str.slice(0,initposition);
    var strtmpr=str.slice(initposition,str.length);
    return strtmpl+insertstr+strtmpr;

}


//add size and date of file to html
function sizeAndDateToHtml(directory){
    if(!key){
        var names=document.getElementsByClassName("nameL");
    }
    else{
        var names=document.getElementsByClassName("nameR");
    }
    for(let i=0; i<names.length; i++){
            var filedir=directory+names[i].innerText;
            fs.stat(filedir, function (err, stats) {
                if(stats.isFile()){
                    var filedate=dateFormat(stats["atime"].toString().slice(4,21));
                    var filesize=fileSizeFormat(stats["size"])+"B";
                }
                else if(stats.isDirectory()){
                    var filedate="";
                    var filesize="";
                    names[i].classList.add("folder");
                }
                names[i].insertAdjacentHTML('afterend',
                    "<td class='size'>"+filesize+"</td><td class='date'>"+filedate+"</td>");
            });
    }
}
function filesize(directory,filename){
    var filedir=directory+filename
    fs.stat(filedir, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        if(stats.isFile()){
            console.log(stats["size"]);
        }
     });
}

//some common function, date frormant, keycode ...
