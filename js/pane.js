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
    async showList(paneDir){        
        //clear filelist 
        this.fileList = []
        //read dircectory
        const dir = await fs.promises.readdir(paneDir);
        var k = 0;
        for await(const dirent of dir){
            //get dirent type, show type 2 file or folder
            var filedir = paneDir+dirent;
            // electron can't use promises.opendir, then can't get fs.dirent
            // var direnttype = dirent[Object.getOwnPropertySymbols(dirent)[0]];
            // if(direnttype==2){
            //system files are not alowed get stats, then use try
            try{
                const stats = await fs.promises.stat(filedir);
                if(stats.isDirectory()){
                    var filetype = "folder";
                    var filedate = "";
                    var filesize = "";
                }
                else{
                    var filetype = "file";
                    var filedate = common.dateFormat(stats.atime);
                    var filesize = common.fileSizeFormat(stats.size);
                }                    
                this.fileList[k++] = new file(filedir,dirent,filetype,filesize,filedate);
            }catch(err){
                console.error(err)
            }
            // }
        }
        this.showFileList();
        this.dirs.set(paneDir);
        this.setDirHeader(paneDir);
        this.addOnclick();
        this.addOndblclick();                
        this.resetCursor(0);

    }
    addOndblclick(){        
        this.refreshFolder();
        for(let i=0; i<this.fileItems.length;i++){
            this.fileItems[i].addEventListener('dblclick', ()=>{
                this.key = i;                
                var filedir = this.fileList[i].dir;
                //if filename contain space, add "" for filename.
                if(this.fileList[i].name.indexOf(" ")!=-1){
                    let splitFileDir = this.fileList[i].dir.split("/")
                    splitFileDir[splitFileDir.length-1] = '"'+this.fileList[i].name+'"'
                    var filedir = splitFileDir.join("/");
                }
                if(this.fileList[i].type=="folder"){
                    this.showList(filedir+"/",i);
                }
                else{
                    // if file, open file by default program of system
                    // exec("start"+" "+filedir.toString());
                    exec(filedir);
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

class file{
    constructor(dir, name, type, size, atime){
        this.dir = dir;
        this.name = name;
        this.type = type;
        this.size = size;
        this.atime = atime;
    }
}
module.exports = pane;