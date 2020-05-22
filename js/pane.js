var fs = require('fs')
var Fman = require('./fman')
var common = require('./common')
var exec = require('child_process').exec;
const hidefile = require('hidefile')

class Pane extends Fman {
  //   constructor (whichPane, directory) {
  //     super(whichPane, directory)
  //   }

  ini(anotherPane, isActive) {
    this.anotherPane = anotherPane
    this.showList(this.dirs.now, isActive)
  }

  async showList(paneDir, isActive) {
     console.log('showlist')
    // clear filelist
    this.fileList = []
    // refersh dirs
    this.dirs.now = paneDir
    // read dircectory
    const dir = await fs.promises.readdir(paneDir)
    var k = 0
    for await (const dirent of dir) {
      // get dirent type, show type 2 file or folder
      var filedir = paneDir + dirent
      // electron can't use promises.opendir, then can't get fs.dirent
      // var direnttype = dirent[Object.getOwnPropertySymbols(dirent)[0]];
      // if(direnttype==2){
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
          this.fileList[k] = new file(filedir, dirent, filetype, filesize, filedate)

          k = k + 1
        }
      } catch (err) {
        console.error(err)
      }

    }
    this.showFileList()

    this.setDirHeader(paneDir)
    this.addOnclick()
    this.addOndblclick()
    if (isActive){
      this.active(0)
    }
      
  }

  ishidden(file) {
    hidefile.shouldBeHidden(file.dir, (err, result) => {
      if (err == null) {
        // console.log(result);  //-> true
        if (result) {
          file.hide = 1
        }
        else {
          file.hide = 0
        }
      }
      else {
        console.log(err)
      }
    })


  }


  addOndblclick() {
    this.refreshFolder()
    for (let i = 0; i < this.fileItems.length; i++) {
      this.fileItems[i].addEventListener('dblclick', () => {
        this.key = i
        this.openFileOrFolder()
      })
    }
  }
  openFileOrFolder() {
    var i = this.key
    //if folder is empty, do nothing
    if(this.fileList.length==0)
      return

    // for fs, the dir needn't add "", but for exec, the dir should add "" for which include space.
    if (this.fileList[i].type == 'folder') {
      this.showList(this.fileList[i].dir + '/', 1)
      // the key should clear when open a folder
      this.key = 0
    }
    else {
      // if file, add "" for file or folder name contain space
      exec(this.fileList[i].formatDir())
    }
  }

  renameFile() { }
  deletFile() { }
  copyFile() { }
  newfile() { }
  newfolder() { }
}

class file {
  constructor(dir, name, type, size, atime) {
    this.dir = dir
    this.name = name
    this.type = type
    this.size = size
    this.atime = atime
    this.hide = 0
  }
  formatDir() {
    // if filename contain space, add "" for filename.
    var splitFileDir = this.dir.split('/')
    for (let j = 0; j < splitFileDir.length; j++) {
      if (splitFileDir[j].indexOf(' ') != -1) { splitFileDir[j] = '"' + splitFileDir[j] + '"' }
    }
    // splitFileDir[splitFileDir.length - 1] = '"' + this.name + '"'
    // console.log(splitFileDir.join('/'))
    return splitFileDir.join('/')
  }
  folder(){
    var filedirlist = this.dir.split('/')
    if(filedirlist.length>=2)
      return filedirlist.slice(0,filedirlist.length-1).join('/')
  }
}
module.exports = Pane
