document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // when key "BackSpace" pressed
    if (e && e.keyCode == 8 && filterStr[key]=="") { 
        // delete last folder
        refreshDirnow();
        var dirbackarr=dirnow[key].split("/")
        dirbackarr.splice(-2,1)
        var dirback=dirbackarr.join('/');
        console.log("back is "+dirback);
        showList(dirback);  
    }
    // when key "up arrow" pressed
    else if (e && e.keyCode == 38) {
        e.preventDefault(); //prevent previeous scroll event
        let filebtns=getfilebtns();
        if(cursorPosition[key]==0)
            cursorPosition[key]=0;
        else
            cursorPosition[key]-=1;
        filebtns[cursorPosition[key]].click();
        filebtns[cursorPosition[key]].scrollIntoViewIfNeeded();
    }
    // when key "down arrow" pressed
    else if (e && e.keyCode == 40) {
        e.preventDefault();
        let filebtns=getfilebtns();
        if(cursorPosition[key]==filebtns.length-1)
            cursorPosition[key]=filebtns.length-1;
        else
            cursorPosition[key]+=1;
        filebtns[cursorPosition[key]].click();
        filebtns[cursorPosition[key]].scrollIntoViewIfNeeded();
    }
    // when "enter" pressed
    else if (e && e.keyCode == 13) {
        //should be optimize with dblckick function
        let filebtns=getfilebtns();

        if(filebtns[cursorPosition[key]].classList[1]=="folder"){
            // if folder, open folder and show file list in folder
            console.log("this is dir="+dirnow[key]);
            refreshDirnow();
            showList(dirnow[key]+filebtns[cursorPosition[key]].innerText+"/"); 
        } 
        else{
            dirnowL=document.getElementById("leftdir").innerHTML;
            // if file, open file by default program of system
            exec("start"+" "+dirnow[key]+"/"+filebtns[cursorPosition[key]].innerText);
            console.log("this is file "+filebtns[cursorPosition[key]].id);
        }
    }
    // when key "tap" pressed
    else if (e && e.keyCode == 9) {
        if(!key){
            key=1;
            
        }
        else{
            key=0;
        }
        document.getElementsByTagName("section")[key].click()
        fileinview();
        clearBothBG();
        cursorBG(cursorPosition[key],key,"#49483e");
    }
    //esc
    else if(e && e.keyCode == 27){
        // hide filter box
        filterStr[key]="";
        var quickNavEle=document.getElementsByClassName("quicknav");``
        quickNavEle[key].classList.add("hide");
    }
    else{
        var quickNavEle=document.getElementsByClassName("quicknav");
        if (e && e.keyCode == 8){
            //if backspace, str backspace as well. and refresh box
            console.log(filterStr[key])
            let fstr=filterStr[key];
            console.log(fstr)
            fstr=fstr.slice(0,fstr.length-1);
            filterStr[key]=fstr;
            console.log(fstr)
        }
        else{
            var keycodenow=e.keyCode;
            var keystr=String.fromCharCode(keycodenow);
            filterStr[key]=filterStr[key]+keystr.toString();
        }
        quickNavEle[key].innerHTML=filterStr[key];
        // hide box if empty
        if(quickNavEle[key].innerHTML){
            quickNavEle[key].classList.remove("hide")
        }
        else{
            quickNavEle[key].classList.add("hide")
        }
    }
}