

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