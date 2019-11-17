var cm = require("./js/common")
var visibleFileNum = [];
var visblekey = 0;
var filterbegin = 0;
var rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
document.onkeydown = function (event) {

    var e = event || window.event || arguments.callee.caller.arguments[0];
    
    if(pane.activepane == leftpane.whichPane){
        var panenow = leftpane;
        var panelast = rightpane;
    }
    else{
        var panenow = rightpane;
        var panelast = leftpane;
    }
    
    // when key "BackSpace" pressed
    if (e && e.keyCode == 8 && filterStr[pane.activepane]=="") { 
        // delete last folder
        var dirbackarr=panenow.dirs.now.split("/")
        if(dirbackarr.length>2){
            dirbackarr.splice(-2,1)
            var dirback=dirbackarr.join('/');
            //refresh folder
            panenow.showList(dirback)
        }
    }
    // when key "up arrow" pressed
    else if (e && e.keyCode == 38) {
        e.preventDefault(); //prevent previeous scroll event
        var cursorPosNow = panenow.key-1;
        // if first file is visibale, first file is invisible.
        //when cursorPosNow == 0; if file0 hiden, cursor position dosen't change.

        if(cursorPosNow>=0 & panenow.fileItems[cursorPosNow].parentNode.classList.length==1){
            var cursorNext = cursorPosNow;
            for(let i=cursorPosNow; i!=0;i--){
                cursorNext = cursorNext-1;
                if(panenow.fileItems[cursorNext].parentNode.classList.length==0)
                    break;
            }
            if(cursorNext!=0)
                cursorPosNow=cursorNext;
            else{
                cursorPosNow = panenow.key;
            }
        }
        else if(cursorPosNow<=0){ // cursorPosNow ==0 and visble. 
            cursorPosNow = panenow.key
        }

        
        // console.log(visibleFileNum)
        
        panenow.resetCursor(cursorPosNow)
        panenow.fileItems[cursorPosNow].click();
        panenow.fileItems[cursorPosNow].scrollIntoViewIfNeeded();
    }
    // when key "down arrow" pressed
    else if (e && e.keyCode == 40) {
        e.preventDefault(); //prevent previeous scroll event
        var cursorPosNow = panenow.key+1;
        if(cursorPosNow<= panenow.fileItems.length-1 & panenow.fileItems[cursorPosNow].parentNode.classList.length==1){
            var cursorNext = cursorPosNow;
            for(let i=cursorPosNow+1; i<panenow.fileItems.length-1;i++){
                console.log("hide "+ i.toString())
                cursorNext =i;
                if(panenow.fileItems[i].parentNode.classList.length==0)
                {
                    break;
                }
                
            }
            if(cursorNext<panenow.fileItems.length-1)
                cursorPosNow=cursorNext;
            else{
                cursorPosNow = panenow.key;
            }
        }
        else if(cursorPosNow > panenow.fileItems.length-1){
            cursorPosNow = panenow.key;
        }
        // if(cursorPosNow>panenow.fileItems.length-1)
        //     cursorPosNow = panenow.fileItems.length-1;
        panenow.resetCursor(cursorPosNow)
        panenow.fileItems[cursorPosNow].click();
        panenow.fileItems[cursorPosNow].scrollIntoViewIfNeeded();
    }
    // when "enter" pressed
    else if (e && e.keyCode == 13) {
        //should be optimize with dblckick function
        let i = panenow.key;
        let filedir = panenow.dirs.now+ panenow.fileItems[i].innerHTML; 
        if(panenow.fileList[3][i]=="folder"){
            panenow.showList(filedir+"/",i);
            // this.dirs.set(filedir+"/")
        }
        else{
            // if file, open file by default program of system
            exec("start"+" "+filedir);
        }
    }
    // when key "tap" pressed
    else if (e && e.keyCode == 9) {
            panenow.inactive();
            panelast.active();
    }
    //esc
    else if(e && e.keyCode == 27){
        // hide filter box
        filterStr[pane.activepane]="";
        panenow.quicknav.classList.add("hide");
        visibleFileNum=cm.fileFilter(panenow, filterStr[pane.activepane],panenow.fileList[0]);
    }
    else{
        filterbegin = 1;
        // visibleFileNum = rangeArray(0,panenow.fileList[0].length);
        if (e && e.keyCode == 8){
            //if backspace, str backspace as well. and refresh box
            // console.log(filterStr[pane.activepane])
            let fstr=filterStr[pane.activepane];
            // console.log(fstr)
            fstr=fstr.slice(0,fstr.length-1);
            filterStr[pane.activepane]=fstr;
            // console.log(fstr)
        }
        else{
            var keycodenow=e.keyCode;
            var keystr=String.fromCharCode(keycodenow);
            filterStr[pane.activepane]=filterStr[pane.activepane]+keystr.toString();
        }
        panenow.quicknav.innerHTML=filterStr[pane.activepane];
        visibleFileNum=cm.fileFilter(panenow, filterStr[pane.activepane],panenow.fileList[0]);
        // hide box if empty
        if(panenow.quicknav.innerHTML){
            panenow.quicknav.classList.remove("hide")
        }
        else{
            panenow.quicknav.classList.add("hide")
        }
    }
}