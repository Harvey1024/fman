var fs=require("fs")
var sys=require("sys")
var exec = require('child_process').exec;

var dirnow;
var dirback;
// initial filelist after html loaded
window.onload=function(){
    dirnow="C:/Users/cquda/OneDrive/Web/fman/test/"    
    showList(dirnow);
}

document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 8) { 
        // delete last folder
        dirnow=document.getElementById("leftdir").innerHTML;
        var dirbackarr=dirnow.split("/")
        dirbackarr.splice(-2,1)
        dirback=dirbackarr.join('/');
        console.log("back is "+dirback);
        showList(dirback);  
    }
}
// file click function
function fileclickfun(){
    var filebtns=document.getElementsByClassName("name");
    for(let i=0; i<filebtns.length;i++){
      
        filebtns[i].addEventListener('dblclick', function(){
            var btn=document.getElementById("leftfile"+i.toString());
            
            if(btn.classList[1]=="folder"){
                // if folder, open folder and show file list in folder
                console.log("this is dir="+dirnow);
                dirnow=document.getElementById("leftdir").innerHTML;
                showList(dirnow+btn.innerText+"/");                
            } 
            else{
                dirnow=document.getElementById("leftdir").innerHTML;
                // if file, open file by default program of system
                exec("start"+" "+dirnow+"/"+btn.innerText);
                console.log("this is file "+btn.id);
            }
        })
    }
    console.log("click setted");
}

// input dir show filelist on windows
function showList(directory){
    dirnow=directory;
    fs.readdir(directory,function(err, files){
        if (err) {
            return console.error(err);
        }
        //show filelist in html
        var fileListTable=document.getElementsByClassName("inflist");
        var tabelLeft=fileListTable[1];
        tabelLeft.innerHTML=nameToHtmlTable(directory,files);
        sizeToHtml(directory,files);

        // fileclickfun() should be in call back function
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
            var fileid="leftfile"+k.toString();
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