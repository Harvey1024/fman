//some common function, date frormant, keycode ...

// transform date formate from "Thu Nov 07 2019 18:29:48 GMT+0" to "2019/11/07 18:29"
function dateFormat(date){
    var year = date.getFullYear().toString().slice(2,4);
    var month = date.getMonth().toString();
    var day = date.getDate().toString();
    var hour = date.getHours().toString();
    var minutes = date.getMinutes().toString();

    return year+"/"+month+"/"+day +" "+hour+":"+minutes

}

// transform date size from B to GB,M,KB
function fileSizeFormat(size){
    return size.toString()+"B";
}

function refreshDirnow(){
    let dirnowL=document.getElementById("leftdir").innerText;
    let dirnowR=document.getElementById("rightdir").innerText;
    dirnow=[dirnowL,dirnowR];
}

//scroll into view when press up and down arrow
function fileinview(){
    let filebtns=getfilebtns();
    filebtns[cursorPosition[key]].scrollIntoViewIfNeeded();
    // window.location.hash=filebtns[cursorPosition[key]].id;  //show the file selected in view.
}

module.exports = {
    dateFormat, 
    refreshDirnow,
    fileSizeFormat, 
    fileinview
}
