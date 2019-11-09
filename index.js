var fs=require("fs")
var sys=require("sys")
var exec = require('child_process').exec;

var dirnowL;
var dirnowR;
var activePan="left";
var cursorPositionL=0;
var cursorPositionR=0;
// initial filelist after html loaded
window.onload=function(){
    dirnowL="C:/Users/cquda/OneDrive/Web/fman/test/";
    dirnowR="C:/"
    showList(dirnowL);
    // showList(dirnowR,"right");
}

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // when key "BackSpace" pressed
    if (e && e.keyCode == 8) { 
        // delete last folder
        dirnowL=document.getElementById("leftdir").innerHTML;
        var dirbackarr=dirnowL.split("/")
        dirbackarr.splice(-2,1)
        var dirback=dirbackarr.join('/');
        console.log("back is "+dirback);
        showList(dirback);  
        resetCursor();
    }
    // when key "up arrow" pressed
    var filebtns=document.getElementsByClassName("name");
    if (e && e.keyCode == 38) {
        if(cursorPositionL==0)
            cursorPositionL=filebtns.length-1;
        else
            cursorPositionL=cursorPositionL-1;
        filebtns[cursorPositionL].click();
    }
    // when key "down arrow" pressed
    if (e && e.keyCode == 40) {
        if(cursorPositionL==filebtns.length-1)
            cursorPositionL=0;
        else
            cursorPositionL=cursorPositionL+1;
        filebtns[cursorPositionL].click();
    }
    // when "enter" pressed
    if (e && e.keyCode == 13) {
        //should be optimize with dblckick function
        var filebtns=document.getElementsByClassName("name");
        if(filebtns[cursorPositionL].classList[1]=="folder"){
            // if folder, open folder and show file list in folder
            console.log("this is dir="+dirnowL);
            dirnowL=document.getElementById("leftdir").innerHTML;
            showList(dirnowL+filebtns[cursorPositionL].innerText+"/"); 
            resetCursor();               
        } 
        else{
            dirnowL=document.getElementById("leftdir").innerHTML;
            // if file, open file by default program of system
            exec("start"+" "+dirnowL+"/"+filebtns[cursorPositionL].innerText);
            console.log("this is file "+filebtns[cursorPositionL].id);
        }
    }
    // when key "tap" pressed
}

// show the background of current cursor position 
function cursorBG(cursorPosition,activePan,bg){
    let fileid;
    if(activePan=="left")
        fileid="Lfile";
    else
        fileid="Rfile";
    var filerow=document.getElementById(fileid+cursorPosition.toString());
    filerow.parentNode.style.backgroundColor=bg;

}
// file click function , chang cursor position and change backgroundColor
function fileclickfun(){
    var filebtns=document.getElementsByClassName("name");
    
    for(let i=0; i<filebtns.length;i++){
        
        filebtns[i].addEventListener('click', function(){
            if(filebtns[i].id.slice(0,5)=="Lfile"){
                activePan="left";
                cursorPositionL=i;
            }
            else{
                activePan="right";
                cursorPositionR=i;
            }
            clearBG();
            cursorBG(i,activePan,"#49483e");
        })
    }
}
function clearBG(){
    var filebtns=document.getElementsByClassName("name");
    for(var j=0; j<filebtns.length;j++){
        cursorBG(j,activePan,"#272822")
    }
}
function resetCursor(){
    if(activePan=="left"){
        cursorPositionL=0;
        cursorBG(cursorPositionL,activePan,"#49483e");
    }
    else{
        cursorPositionR=0;
        cursorBG(cursorPositionR,activePan,"#49483e");
    }
}
// file double click function
function filedblclickfun(){
    var filebtns=document.getElementsByClassName("name");
    for(let i=0; i<filebtns.length;i++){
      
        filebtns[i].addEventListener('dblclick', function(){
            var btn=document.getElementById("Lfile"+i.toString());
            
            if(btn.classList[1]=="folder"){
                // if folder, open folder and show file list in folder
                console.log("this is dir="+dirnowL);
                
                dirnowL=document.getElementById("leftdir").innerHTML;
                showList(dirnowL+btn.innerText+"/");
                resetCursor();                
            } 
            else{
                dirnowL=document.getElementById("leftdir").innerHTML;
                // if file, open file by default program of system
                exec("start"+" "+dirnowL+"/"+btn.innerText);
                console.log("this is file "+btn.id);
            }
        });
    }
    console.log("click setted");
}


// input dir show filelist on windows
function showList(directory){
    dirnowL=directory;
    fs.readdir(directory,function(err, files){
        if (err) {
            return console.error(err);
        }
        //show filelist in html
        var fileListTable=document.getElementsByClassName("inflist");
        var tabelLeft=fileListTable[1];
        tabelLeft.innerHTML=nameToHtmlTable(directory,files);
        sizeToHtml(directory,files);

        // filedblclickfun() should be in call back function
        filedblclickfun();
        cursorBG(cursorPositionL,activePan,"#49483e");
        fileclickfun();        
    });    
    console.log("finished show list");
    
    
}

// transform array to html table
function nameToHtmlTable(directory,files){
    var tableString="";
    console.log(files)
    for(var i=0, k=0; i<files.length;i++){
        if(files[i][0]!="." && files[i][0]!="$"){
            console.log(files[i].toString())
            var fileid="Lfile"+k.toString();
            k++;
            tableString=tableString+"<tr>"+"<td class='name',"+" id="+ fileid+">"+files[i]+"</td></tr>";
                       
        }
    }
    document.getElementById("leftdir").innerHTML=directory; 
    return tableString
}
function sizeToHtml(directory,files){
    var names=document.getElementsByClassName("name");
    
    for(let i=0; i<names.length; i++){
            var filedir=directory+names[i].innerText;        
            fs.stat(filedir, function (err, stats) {
                if(stats.isFile()){
                    var filedate=dateFormat(stats["atime"].toString().slice(4,21));
                    var filesize=fileSizeFormat(stats["size"]);
                    names[i].insertAdjacentHTML('afterend',"<td class='size'>"+filesize+"B</td><td class='date'>"+filedate+"</td>");
                }
                if(stats.isDirectory()){
                    names[i].classList.add("folder");
                }
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