var fs = require("fs")
var fman = require("./fman")
var common = require("./common")
class pane extends fman {
    constructor(whichPane,directory){
        super(whichPane,directory);
    }
    ini(){
        this.showList(this.dirs.now);
    }
    showList(paneDir){        
        //read dircectory        
        fs.readdir(paneDir,(err, files)=>{
            if(err){
                return console.error(err);
            }
            else{
                var fileNameList=files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
                // fet file dates and show file and folder in html     
                this.getFileState(paneDir,fileNameList);
            }
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
                else {
                    if(stats.isFile()){
                        fileDateList[i]=common.dateFormat(stats["atime"]);
                        fileSizeList[i]=common.fileSizeFormat(stats["size"]);
                        folderList[i] = 0;
                    }
                    else if(stats.isDirectory()){
                        fileDateList[i]=" ";
                        fileSizeList[i]=" ";
                        folderList[i] = "folder";
                    }
                    else{
                        fileDateList[i]=" ";
                        fileSizeList[i]=" ";
                        folderList[i] = 0;
                    }
                    this.dirs.set(directory);
                    this.setDirHeader(directory);
                    this.fileList = [fileNameList, fileSizeList, fileDateList, folderList];
                    this.showFileList()
                    this.addOnclick();
                    this.addOndblclick();                
                    this.resetCursor(0);

                }               
            });
        }
       
        return [fileSizeList, fileDateList, folderList]
    }
    addOndblclick(){        
        this.refreshFolder();
        for(let i=0; i<this.fileItems.length;i++){
            this.fileItems[i].addEventListener('dblclick', ()=>{
                this.key = i;                
                let filedir = this.dirs.now+ this.fileItems[i].innerHTML
                if(this.fileList[3][i]=="folder"){
                    this.showList(filedir+"/",i);
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