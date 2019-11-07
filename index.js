var fs=require("fs")

// initial filelist after html loaded
window.onload=function(){
    showList("/users/cquda/onedrive/web/fman/");
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
        tabelLeft.innerHTML=nameToHtmlTable(files);
        sizeToHtml(dir,files);
        console.log(files)    
    });
}

// transform array to html table
function nameToHtmlTable(files){
    var tableString="";
    for(let i=0; i<files.length;i++){
        tableString=tableString+"<tr>"+"<td class='name'>"+files[i]+"</td></tr>"
    }
    return tableString;
}
function sizeToHtml(dir,files){
    var names=document.getElementsByClassName("name");
    
    for(let i=0; i<files.length; i++){
        var filedir=dir+files[i];
        fs.stat(filedir, function (err, stats) {
            if(stats.isFile()){
                filedate=stats["atime"].toString().slice(0,15);
                names[i+1].insertAdjacentHTML('afterend',"<td class='size'>"+stats["size"]+"B</td><td class='date'>"+filedate+"</td>")
                console.log(stats["size"]);
            }
         });
        
    }
}
function filesize(dir,filename){
    var filedir=dir+filename
    fs.stat(filedir, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        if(stats.isFile()){
            console.log(stats["size"]);
        }
     });
}