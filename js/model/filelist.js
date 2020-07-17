var FileFolder= require("./file")
var File = FileFolder.File
var Folder = FileFolder.Folder
var common = require('../common')
var fs = require("fs")
const hidefile = require('hidefile')

class AbstractFileList {
    constructor(){
        this.filelist = []
        this.fileorder = []
        this.filterFileList = []
        this.fileSelected = []
    }
    async getFileList(dir){}
    filter(str){}
    sort(sortStr){}
}

class FileList extends AbstractFileList {
    async getFileList(dir){
        const files = await fs.promises.readdir(dir)
        console.log(files)
        var k = 0
        for await (const filename of files) {
        // get dirent type, show type 2 file or folder
            var filedir = dir + filename
            console.log(filedir)
            // electron can't use promises.opendir, then can't get fs.dirent
            // system files are not alowed get stats, then use try
            try {
                var result = hidefile.shouldBeHiddenSync(filedir)
                if (result) {
                // console.log(filedir)
                } 
                else {
                    // if file is not hide, add file to fileList
                    const stats = await fs.promises.stat(filedir)
                    var filedate = ''
                    var filesize = ''
                    var filetype = ''
                    if (stats.isDirectory()) {
                        filetype = 'folder'
                        filesize = '--'
                    } else {
                        filetype = 'file'
                        filesize = common.fileSizeFormat(stats.size)
                }
                filedate = common.dateFormat(stats.atime)
                this.filelist[k] = new File(filedir, dir, filetype, filesize, filedate)
                this.filelist[k].name = filename
                this.filelist[k].type = filetype
                this.filelist[k].size = filesize
                this.filelist[k].atime = filedate
                k = k + 1
                }
            } catch (err) {
            // console.error(err)
            }
        }
    }
}



module.exports = FileList