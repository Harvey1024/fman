
class fman{        
    constructor(){
        this.main = document.getElementById("leftdir").id;
        this.paneName="left";
    }
    setMainHeight(){
        return document.getElementById("leftdir").id;
    }
    resetWindowHeight(){
        let windowheight = document.documentElement.clientHeight
        let sectionelem = document.getElementsByTagName("section")
        document.getElementsByTagName("main")[0].style.height=windowheight.toString()+"px"
        sectionelem[0].style.height=(windowheight-93).toString()+"px";
        sectionelem[1].style.height=(windowheight-93).toString()+"px";
    }

}

module.exports = fman;