var fs=require("fs")

// initial filelist after html loaded
window.onload=function(){
    showList("/users/cquda/onedrive/");
}

// input dir show filelist on windows
function showList(dir){
    fs.readdir(dir,function(err, files){
        if (err) {
            return console.error(err);
        }
        //show filelist in html
        var fileListTable=document.getElementsByClassName("inflist");
        var tabelLeft=fileListTable[1];
        tabelLeft.innerHTML=arrayToHtmlTable(files);
        console.log(files)    
    });
}

// transform array to html table
function arrayToHtmlTable(files){
    var tableString="";
    for(let i=0; i<files.length;i++){
        tableString=tableString+"<tr>"+"<td class='name'>"+files[i]+"</td></tr>"
    }
    return tableString;
}
