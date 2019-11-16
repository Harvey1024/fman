

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
        clearBothBG();~
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
