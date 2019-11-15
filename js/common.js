//some common function, date frormant, keycode ...

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