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