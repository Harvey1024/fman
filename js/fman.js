var pane = require("./pane")
var exec = require('child_process').exec;
var activepane = "left";
class fman{        
    constructor(whichPane,directory){
        this.whichPane = whichPane;         //"left" or "right"
        this.dirs = new filedirs(directory);    //file dir, .now, .before, record last dir
        this.key = 0;                           //position of cursor.
        this.dirEle = document.getElementById(whichPane+"dir");
        this.paneId = document.getElementById(whichPane+"InfList")
        this.fileItems = document.getElementsByClassName("name"+whichPane)
        this.fileList = []
        this.unActiveColor = "#272822"
        this.activeColor = "#49483e";
        this.quicknav = document.getElementsByClassName("quicknav"+whichPane)[0];
    }
    static get activepane(){
        return activepane;
    }
    static set activepane(whichPane){
        activepane = whichPane;
    }
    inactive(){
        this.fileItems[this.key].parentNode.style.backgroundColor=this.unActiveColor;
    }
    active(){
        this.resetCursor(this.key)
        activepane = this.whichPane;
        // this.paneId.focus();
    }
    refreshFolder(){
        this.fileItems = document.getElementsByClassName("name"+this.whichPane)
    }
    setDirHeader(dircectory){
        this.dirEle.innerHTML = dircectory;
    }
    showFileList(){
        //add file list in html
        var paneInnerText = "";
        var nameClassStr =""; 
        var sizeStr = "";
        var dateStr = "";
        for(let i = 0; i<this.fileList.length; i++){
            let filename = this.fileList[i].name;
            let filesize = this.fileList[i].size;
            let filedate = this.fileList[i].atime;
            nameClassStr = "<td class='name" + this.whichPane +"'>"+filename+"</td>";
            sizeStr = "<td class='size'>"+ filesize + "</td>";
            dateStr = "<td class='date'>" + filedate + "</td>";
            paneInnerText = paneInnerText + "<tr>"+nameClassStr+sizeStr+dateStr+"</tr>";
        }
        this.paneId.innerHTML = paneInnerText;
    }
    addOnclick(){
        //add onclick function on each file
        this.refreshFolder();
        for(let i=0; i<this.fileItems.length;i++){
            this.fileItems[i].addEventListener('click', ()=>{
                this.resetCursor(i);
                // this.clearOtherCursor()
                this.key = i;
                activepane = this.whichPane;
            })
        }
    }
    resetCursor(position){
        //if position is number, hightlight the file selected, 
        // if position="hide", none of file is hightlight
        this.key = position;
        this.refreshFolder();
        for(let i=0; i<this.fileItems.length; i++){
            if(position=="hideall")
                var cursorColor = this.unActiveColor;
            else if(i!=position)
                var cursorColor = this.unActiveColor;
            else
                var cursorColor = this.activeColor;
            this.fileItems[i].parentNode.style.backgroundColor= cursorColor;
        }
    }
    static resetWindowHeight(){
        let windowheight = document.documentElement.clientHeight
        let sectionelem = document.getElementsByTagName("section")
        document.getElementsByTagName("main")[0].style.height=windowheight.toString()+"px"
        sectionelem[0].style.height=(windowheight-93).toString()+"px";
        sectionelem[1].style.height=(windowheight-93).toString()+"px";
    }

}

class filedirs{
    constructor(directory){
        this.before = directory;
        this.now = directory;
    }
    set(directory){
        if(this.now!=directory){
            this.before = this.now;
            this.now = directory;
        }        
    }
}
module.exports = fman;