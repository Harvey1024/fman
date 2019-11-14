
class fman{        
    constructor(whichPane){
        // this.whichPane = whichPane;         //"left" or "right"
        // this.dirnow = ["C:/Users/","C:"];   //file dir for left and right pane.
        // this.cursorPosition=[0,0];          //the order number of file selected for each pane.
        // this.key=1;                         //0:left pan, 1:right pan; initialize right fistly
        // this.filterStr=["",""];             //fileter string for each pane

        this.dirEle = document.getElementById(whichPane+"dir");
        this.fileListEle = document.getElementById(whichPane+"InfList")
    }
    setDirHeader(dircectory){
        this.dirEle.innerHTML = dircectory
    }
    showFileList(files){

    }
    addOndblclick(){

    }
    addOnclick(){

    }
    resetCursor(){
        
    }
    static resetWindowHeight(){
        let windowheight = document.documentElement.clientHeight
        let sectionelem = document.getElementsByTagName("section")
        document.getElementsByTagName("main")[0].style.height=windowheight.toString()+"px"
        sectionelem[0].style.height=(windowheight-93).toString()+"px";
        sectionelem[1].style.height=(windowheight-93).toString()+"px";
    }

}
//static 
// fman.dirnow = ["",""];      //file dir for left and right pane.
// fman.cursorPosition=[0,0];  //the order number of file selected for each pane.
// fman.key=1;                 //0:left pan, 1:right pan; initialize right fistly
// fman.filterStr=["",""];     //fileter string for each pane

module.exports = fman;