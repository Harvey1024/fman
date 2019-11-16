var pane = require("./pane")
var exec = require('child_process').exec;
class fman{        
    constructor(whichPane){
        this.whichPane = whichPane;         //"left" or "right"
        // this.dirnow = ["C:/Users/","C:"];   //file dir for left and right pane.
        // this.cursorPosition=[0,0];          //the order number of file selected for each pane.
        // this.key=1;                         //0:left pan, 1:right pan; initialize right fistly
        // this.filterStr=["",""];             //fileter string for each pane
        this.dirs = new filedirs();
        this.name = "fman"
        this.key = 0;
        this.dirEle = document.getElementById(whichPane+"dir");
        this.paneId = document.getElementById(whichPane+"InfList")
        this.fileItems = document.getElementsByClassName("name"+whichPane)
        this.fileList = []
        this.unActiveColor = "#272822"
        this.activeColor = "#49483e";
    }
    refreshFolder(){
        this.fileItems = document.getElementsByClassName("name"+this.whichPane)
    }
    setDirHeader(dircectory){
        this.dirEle.innerHTML = dircectory;
    }
    showFileList(){
        // this.fileList = files;
        var fileNameList = this.fileList[0];
        var fileNameList = this.fileList[0];
        
        var fileSizeList = this.fileList[1];
        var fileDateList = this.fileList[2];
                
        // console.log(this.fileSizeList)
        var folderList = this.fileList[3];
        var paneInnerText = "";
        var nameClassStr =""; 
        var sizeStr = "";
        var dateStr = "";
        for(let i = 0; i<fileNameList.length; i++){
            // console.log(this.fileList[1][1])
            
            nameClassStr = "<td class='name" + this.whichPane +"'>"+fileNameList[i]+"</td>";

            sizeStr = "<td class='size'>"+this.fileList[1][i] + "</td>";
            // console.log(this.fileList[1][i])
            dateStr = "<td class='date'>" +this.fileList[2][i]+"</td>";
            paneInnerText = paneInnerText + "<tr>"+nameClassStr+sizeStr+dateStr+"</tr>";
        }
        this.paneId.innerHTML = paneInnerText;

    }
    
    addOnclick(){
        this.refreshFolder();
        for(let i=0; i<this.fileItems.length;i++){
            this.fileItems[i].addEventListener('click', ()=>{
                this.resetCursor(i);
                this.clearOtherCursor()
                this.key = i;
            })
        }
    }
    resetCursor(position){
        //if position is number, hightlight the file selected, 
        // if position="hide", none of file is hightlight
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
    clearOtherCursor(){
        var otherpane = "";
        if(this.whichPane=="left")
            otherpane = "right"
        else
            otherpane = "left"
        var otherPaneItems = document.getElementsByClassName("name"+otherpane)
        for(let i=0; i<otherPaneItems.length; i++){
            otherPaneItems[i].parentNode.style.backgroundColor= this.unActiveColor;
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
    constructor(){
        this.before = "";
        this.now = "";
    }
    set(directory){
        this.before = this.now;
        this.now = directory;
    }
}
//static 
// fman.dirnow = ["",""];      //file dir for left and right pane.
// fman.cursorPosition=[0,0];  //the order number of file selected for each pane.
// fman.key=1;                 //0:left pan, 1:right pan; initialize right fistly
// fman.filterStr=["",""];     //fileter string for each pane

module.exports = fman;