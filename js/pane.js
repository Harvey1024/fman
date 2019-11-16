var fs = require("fs")
var fman = require("./fman")
var common = require("./common")
class pane extends fman {
    constructor(whichPane){
        super(whichPane);
        this.cursorPosition={"left":0, "right":0};
    }
    ini(paneDir,cursorPosition){
        this.showList(paneDir,cursorPosition);
    }
    showList(paneDir,cursorPosition){
        this.cursorPosition = cursorPosition;
        //read dircectory        
        fs.readdir(paneDir,(err, files)=>{
            var fileNameList=files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
            // fet file dates and show file and folder in html     
            console.log(paneDir)  
            this.setDirHeader(paneDir);     
            this.getFileState(paneDir,fileNameList);
        });
    }
    getFileState(directory,files){
        var fileNameList = files;
        var fileSizeList = [];
        var fileDateList = []; 
        var folderList = [];
        for(let i=0; i<files.length; i++){
            var filedir=directory+files[i];
            
            fs.stat(filedir, (err, stats)=>{
                if(err){
                    fileDateList[i]=" ";
                    fileSizeList[i]=" ";
                    folderList[i] = 0;
                }
                if(stats.isFile()){
                    fileDateList[i]=common.dateFormat(stats["atime"]);
                    fileSizeList[i]=common.fileSizeFormat(stats["size"]);
                    folderList[i] = 0;
                }
                else if(stats.isDirectory()){
                    fileDateList[i]=" ";
                    fileSizeList[i]=" ";
                    folderList[i] = "folder";
                    // names[i].classList.add("folder");
                }
                else{
                    fileDateList[i]=" ";
                    fileSizeList[i]=" ";
                    folderList[i] = 0;
                }
                // console.log(fileDateList[i])
                // names[i].insertAdjacentHTML('afterend',
                    // "<td class='size'>"+filesize+"</td><td class='date'>"+filedate+"</td>");
                this.fileList = [fileNameList, fileSizeList, fileDateList, folderList];
                this.showFileList()
                this.addOnclick();
                this.addOndblclick();                
                this.resetCursor(this.cursorPosition[this.whichPane]);
                
            });
        }
        // console.log([fileSizeList, fileDateList, folderList])
        
        return [fileSizeList, fileDateList, folderList]
    }
    addOndblclick(){        
        this.refreshFolder();
        for(let i=0; i<this.fileItems.length;i++){
            this.fileItems[i].addEventListener('dblclick', ()=>{
                this.key = i;                
                let filedir = this.dirEle.innerHTML+ this.fileItems[i].innerHTML
                if(this.fileList[3][i]=="folder"){
                    this.showList(filedir+"/",i);
                    this.dirs.set(filedir+"/")
                }
                else{
                    // if file, open file by default program of system
                    exec("start"+" "+filedir);
                }
            });
        }
    }
    renameFile(){}
    deletFile(){}
    copyFile(){}
    newfile(){}
    newfolder(){}
}

module.exports = pane;