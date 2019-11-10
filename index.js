var fs=require("fs")
var sys=require("sys")
var exec = require('child_process').exec;

var dirnow=["",""];
var cursorPosition=[0,0];
var key=1; //0:left pan, 1:right pan; initialize right fistly

var filterStr=["",""];
// initial filelist after html loaded
window.onload=function(){
    var dirnowL="C:/Users/cquda/";
    var dirnowR="C:/Users/cquda/";
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

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // when key "BackSpace" pressed
    if (e && e.keyCode == 8 && filterStr[key]=="") { 
        // delete last folder
        refreshDirnow();
        var dirbackarr=dirnow[key].split("/")
        dirbackarr.splice(-2,1)
        var dirback=dirbackarr.join('/');
        console.log("back is "+dirback);
        showList(dirback);  
    }
    // when key "up arrow" pressed
    else if (e && e.keyCode == 38) {
        e.preventDefault(); //prevent previeous scroll event
        let filebtns=getfilebtns();
        if(cursorPosition[key]==0)
            cursorPosition[key]=0;
        else
            cursorPosition[key]-=1;
        filebtns[cursorPosition[key]].click();
        filebtns[cursorPosition[key]].scrollIntoViewIfNeeded();
    }
    // when key "down arrow" pressed
    else if (e && e.keyCode == 40) {
        e.preventDefault();
        let filebtns=getfilebtns();
        if(cursorPosition[key]==filebtns.length-1)
            cursorPosition[key]=filebtns.length-1;
        else
            cursorPosition[key]+=1;
        filebtns[cursorPosition[key]].click();
        filebtns[cursorPosition[key]].scrollIntoViewIfNeeded();
    }
    // when "enter" pressed
    else if (e && e.keyCode == 13) {
        //should be optimize with dblckick function
        let filebtns=getfilebtns();

        if(filebtns[cursorPosition[key]].classList[1]=="folder"){
            // if folder, open folder and show file list in folder
            console.log("this is dir="+dirnow[key]);
            refreshDirnow();
            showList(dirnow[key]+filebtns[cursorPosition[key]].innerText+"/"); 
        } 
        else{
            dirnowL=document.getElementById("leftdir").innerHTML;
            // if file, open file by default program of system
            exec("start"+" "+dirnow[key]+"/"+filebtns[cursorPosition[key]].innerText);
            console.log("this is file "+filebtns[cursorPosition[key]].id);
        }
    }
    // when key "tap" pressed
    else if (e && e.keyCode == 9) {
        if(!key){
            key=1;
            
        }
        else{
            key=0;
        }
        document.getElementsByTagName("section")[key].click()
        fileinview();
        clearBothBG();
        cursorBG(cursorPosition[key],key,"#49483e");
    }
    //esc
    else if(e && e.keyCode == 27){
        filterStr[key]="";
        var quickNavEle=document.getElementsByClassName("quicknav");
        quickNavEle[key].classList.add("hide");
    }
    else{
        var quickNavEle=document.getElementsByClassName("quicknav");
        if (e && e.keyCode == 8){
            console.log(filterStr[key])
            let fstr=filterStr[key];
            console.log(fstr)
            fstr=fstr.slice(0,fstr.length-1);
            filterStr[key]=fstr;
            console.log(fstr)
        }
        else{
            var keycodenow=e.keyCode;
            var keystr=String.fromCharCode(keycodenow);
            filterStr[key]=filterStr[key]+keystr.toString();
        }
        quickNavEle[key].innerHTML=filterStr[key];
        // hide box if empty
        if(quickNavEle[key].innerHTML){
            quickNavEle[key].classList.remove("hide")
        }
        else{
            quickNavEle[key].classList.add("hide")
        }
    }
}

function fileinview(){
    let filebtns=getfilebtns();
    filebtns[cursorPosition[key]].scrollIntoViewIfNeeded();
    // window.location.hash=filebtns[cursorPosition[key]].id;  //show the file selected in view.
}

// file click function , chang cursor position and change backgroundColor
function clickfun(){
    // var filebtns=getfilebtns();
    if(!key){
        var filebtns=document.getElementsByClassName("nameL");
        console.log("left")
    }
    else{
        var filebtns=document.getElementsByClassName("nameR");
        console.log("right")
    }
    for(let i=0; i<filebtns.length;i++){
        let mykey=key;
        filebtns[i].addEventListener('click', function(){
            cursorPosition[mykey]=i;
            key=mykey;
            console.log("i = "+i.toString()+" key = "+key.toString())
            clearBothBG();
            cursorBG(i,key,"#49483e");
        })
    }
}
function clearBothBG(){
    clearoneBG(0);
    clearoneBG(1);

}

function clearoneBG(mykey){
    if(!mykey)
        var classname= "nameL";
    else
        var classname = "nameR";
    var filebtns=document.getElementsByClassName(classname);
    for(let j=0; j<filebtns.length;j++){
        cursorBG(j,mykey,"#272822")
    }    
}
// show the background of current cursor position 
function cursorBG(pos,pan,bg){
    let fileid;
    if(pan==0)
        fileid="Lfile";
    else
        fileid="Rfile";
    var filerow=document.getElementById(fileid+pos.toString());
    filerow.parentNode.style.backgroundColor=bg;
}
function resetCursor(){
    cursorPosition[key]=0;
    cursorBG(0,key,"#49483e");
}
// file double click function
function filedblclickfun(){
    filebtns=getfilebtns();
    if(!key){
        var fileid = "Lfile";
    }
    else{
        var fileid= "Rfile";
    }
    for(let i=0; i<filebtns.length;i++){
        let mykey=key;
        filebtns[i].addEventListener('dblclick', function(){
            key=mykey;
            refreshDirnow();
            var btn=document.getElementById(fileid+i.toString());
            if(btn.classList[1]=="folder"){
                // if folder, open folder and show file list in folder
                showList(dirnow[key]+btn.innerText+"/");
                resetCursor();                
            } 
            else{
                // if file, open file by default program of system
                exec("start"+" "+dirnow[key]+"/"+btn.innerText);
                console.log("this is file "+btn.id);
            }
        });
    }
    console.log("click setted");
}

function refreshDirnow(){
    let dirnowL=document.getElementById("leftdir").innerText;
    let dirnowR=document.getElementById("rightdir").innerText;
    dirnow=[dirnowL,dirnowR];
}
function getClassNameElement(){
    if(!key){
        var filebtns=document.getElementsByClassName("nameL");
        var dirid="leftdir";
        dirnowL=document.getElementById(dirid).innerHTML;
        // var dirnow=dirnowL;
        var fileid="Lfile"
        cursorkey=0;
    }
    else{
        var filebtns=document.getElementsByClassName("nameR");
        var dirid="rightdir";
        dirnowR=document.getElementById(dirid).innerHTML;
        // var dirnow=dirnowR;
        var fileid="Rfile"
        cursorkey=1;
    }
    ckey=cursorkey;
    // return [filebtns,dirid,dirnow,fileid,ckey];
}
function getfilebtns(){
    if(!key){
        var filebtns=document.getElementsByClassName("nameL");
    }
    else{
        var filebtns=document.getElementsByClassName("nameR");
    }
    return filebtns;
}

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

// transform date formate from "Thu Nov 07 2019 18:29:48 GMT+0" to "2019/11/07 18:29"
function dateFormat(datestring){
    var fileMonth=datestring.slice(0,3);
    switch(fileMonth){
        case "Jan":
            fileMonth="01";
            break;
        case "Feb":
            fileMonth="02";
            break;
        case "Mar":
            fileMonth="03";
            break;
        case "Apr":
            fileMonth="04";
            break;
        case "May":
            fileMonth="05";
            break;
        case "Jun":
            fileMonth="06";
            break;
        case "Jul":
            fileMonth="07";
            break;
        case "Aug":
            fileMonth="08";
            break;
        case "Sep":
            fileMonth="09";
            break;
        case "Oct":
            fileMonth="10";
            break;
        case "Nov":
            fileMonth="11";
            break;
        case "Dec":
            fileMonth="12";
            break;
    }
    var fileDay=datestring.slice(4,6);
    var fileYear=datestring.slice(7,11);
    var fileHour=datestring.slice(12,17);
    return fileYear+'/'+fileMonth+'/'+fileDay+' '+fileHour;
}

// transform date size from B to GB,M,KB
function fileSizeFormat(size){
    return size;
}