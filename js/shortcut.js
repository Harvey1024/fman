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
        if(cursorPosNow<0)
            cursorPosNow = 0;
        panenow.resetCursor(cursorPosNow)
        panenow.fileItems[panenow.key].click();
        panenow.fileItems[panenow.key].scrollIntoViewIfNeeded();
    }
    // when key "down arrow" pressed
    else if (e && e.keyCode == 40) {
        e.preventDefault(); //prevent previeous scroll event
        var cursorPosNow = panenow.key+1;
        if(cursorPosNow>panenow.fileItems.length-1)
            cursorPosNow = panenow.fileItems.length-1;
        panenow.resetCursor(cursorPosNow)
        panenow.fileItems[panenow.key].click();
        panenow.fileItems[panenow.key].scrollIntoViewIfNeeded();
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
    }
    else{
        if (e && e.keyCode == 8){
            //if backspace, str backspace as well. and refresh box
            console.log(filterStr[pane.activepane])
            let fstr=filterStr[pane.activepane];
            console.log(fstr)
            fstr=fstr.slice(0,fstr.length-1);
            filterStr[pane.activepane]=fstr;
            console.log(fstr)
        }
        else{
            var keycodenow=e.keyCode;
            var keystr=String.fromCharCode(keycodenow);
            filterStr[pane.activepane]=filterStr[pane.activepane]+keystr.toString();
        }
        panenow.quicknav.innerHTML=filterStr[pane.activepane];
        // hide box if empty
        if(panenow.quicknav.innerHTML){
            panenow.quicknav.classList.remove("hide")
        }
        else{
            panenow.quicknav.classList.add("hide")
        }
    }
}