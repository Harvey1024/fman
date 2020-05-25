var fs = require('fs')
// var Fman = require('./fman')
var common = require('./common')
var exec = require('child_process').exec;
const hidefile = require('hidefile')

class Pane {
  constructor(whichPane, directory) {
    this.activestate = 0
    // this.activepane = ''
    this.whichPane = whichPane // "left" or "right"
    this.dirs = new Filedirs(directory) // file dir, .now, .before, record last dir
    this.key = 0 // position of cursor.
    this.dirEle = document.getElementById(whichPane + 'dir')
    this.pane = document.getElementsByClassName(whichPane)[0]
    this.paneId = document.getElementById(whichPane + 'InfList')
    this.fileItems = document.getElementsByClassName('name' + whichPane)
    this.fileList = []
    this.unActiveColor = '#272822'
    this.activeColor = '#49483e'
    this.quicknav = document.getElementsByClassName('quicknav' + whichPane)[0]
    this.anotherPane = ''
    this.visibleFileList = []
  }

  ini(anotherPane, isActive) {
    this.anotherPane = anotherPane
    this.showList(this.dirs.now, isActive)
  }

  //set highlight of files
  inactive(i) {
    this.fileItems[i].parentNode.classList.remove('highlight')
  }

  active(i) {
    this.fileItems[i].parentNode.classList.add('highlight')
  }
  showFileList() {
    // add file list in html
    var paneInnerText = ''
    var nameClassStr = ''
    var sizeStr = ''
    var dateStr = ''
    for (let i = 0; i < this.fileList.length; i++) {
      const filename = this.fileList[i].name
      const filesize = this.fileList[i].size
      const filedate = this.fileList[i].atime
      nameClassStr = "<td class='name" + this.whichPane + "'>" + filename + '</td>'
      sizeStr = "<td class='size'>" + filesize + '</td>'
      dateStr = "<td class='date'>" + filedate + '</td>'

      if (this.fileList[i].hide) {
        console.log(this.fileList[i].hide)
        paneInnerText = paneInnerText + "<tr class = 'filelist hide'>" + nameClassStr + sizeStr + dateStr + '</tr>'
      }
      else
        paneInnerText = paneInnerText + "<tr class = 'filelist'>" + nameClassStr + sizeStr + dateStr + '</tr>'
    }
    this.paneId.innerHTML = paneInnerText
    //add onclick and ondbclick
    this.addOnclick()
    this.addOndblclick()

  }

  addOnclick() {
    // add onclick function on each file
    this.refreshFolder()
    for (let i = 0; i < this.fileItems.length; i++) {
      this.fileItems[i].parentNode.addEventListener('click', () => {
        // this.clearOtherCursor()
        this.key = i
        // this.activepane = this.whichPane
        this.resetCursor(i)
        // this.active(i)
        this.clearCursor(this.anotherPane)
      })
    }
  }


  resetCursor(i = this.key) {
    // if position is number, hightlight the file selected,
    // if position="hide", none of file is hightlight
    this.clearCursor(this)
    this.refreshFolder()
    this.active(i)
    this.key = i
  }

  clearCursor(anotherPane) {
    for (let i = 0; i < anotherPane.fileItems.length; i++)
      anotherPane.inactive(i)
  }

  static resetWindowHeight() {
    const windowheight = document.documentElement.clientHeight
    const sectionelem = document.getElementsByTagName('section')
    document.getElementsByTagName('main')[0].style.height = windowheight.toString() + 'px'
    sectionelem[0].style.height = (windowheight - 93).toString() + 'px'
    sectionelem[1].style.height = (windowheight - 93).toString() + 'px'
  }
  //read dir and show on font end
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
          this.fileList[k] = new file(filedir, dirent, filetype, filesize, filedate,k)
          k = k + 1
        }
      } catch (err) {
        // console.error(err)
      }
    }
    this.showFileList()
    this.setDirHeader(paneDir)
    
    // this.resetCursor()
    if (isActive) {
      this.active(0)
    }
  }
  refreshFolder() {
    this.fileItems = document.getElementsByClassName('name' + this.whichPane)
  }

  setDirHeader(dircectory) {
    this.dirEle.innerHTML = dircectory
  }

  ishidden(file) {
    hidefile.shouldBeHidden(file.dir, (err, result) => {
      if (err == null) {
        // console.log(result);  //-> true
        if (result)
          file.hide = 1
        else
          file.hide = 0
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
    if (this.fileList.length == 0)
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
  sort(sorttype) {
    var fileListSortByDate = []
    if(sorttype == 'date'){
      fileListSortByDate = this.fileList.sort(sortbyDateNewer)
      console.log(fileListSortByDate)
      this.fileList = fileListSortByDate
    }
    
  }
}
// the oldest file rank first
function sortbyDateOlder(a,b){
  return a.dateToNum()-b.dateToNum()
}
//the latest file rank first
function sortbyDateNewer(a,b){
  return b.dateToNum()-a.dateToNum()
}
class file {
  constructor(dir, name, type, size, atime,fileorder) {
    this.dir = dir
    this.name = name
    this.type = type
    this.size = size
    this.atime = atime
    this.hide = 0
    this.fileOrder = fileorder
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
  folder() {
    var filedirlist = this.dir.split('/')
    if (filedirlist.length >= 2)
      return filedirlist.slice(0, filedirlist.length - 1).join('/')
  }
  get isfile() {
    if (this.type == 'file')
      return this._isfile = 1
    else
      return this._isfile = 0
  }
  set isfile(truth) {
    this._isfile = truth
  }
  dateToNum(){
    var k = this.atime.split(/\s|:|\//)
    return (+k[0] * 1000000 + k[1] * 10000 + k[2] * 100 + k[3] * 1 + k[4])
  }
}
class fileLists{
  constructor(files){
    this.sortbyname = files
  }
  get sortbydate(){
    var dateList = []
    var fileOrder = [...Array(this.sortbyname.length).keys()]
    for (var date of this.sortbyname) {
      var k = date.atime.split(/\s|:|\//)
      dateList.push(+k[0] * 1000000 + k[1] * 10000 + k[2] * 100 + k[3] * 1 + k[4])
    }
    for (var i of [...Array(dateList.length).keys()]) {
      dateList[i] = +dateList[i]
    }
    console.log(dateList)
    return this._sortbydate = dateList
  }
}
class Filedirs {
  constructor(directory) {
    this.previous = directory
    this.now = directory
    this.parentDir = ''
  }

  set(directory) {
    if (this.now !== directory) {
      this.previous = this.now
      this.now = directory
    }
  }
  getParentDir() {
    var splitFileDir = this.now.split('/')
    console.log(splitFileDir)
    var sdir = []
    for (var dir in splitFileDir) {
      console.log(splitFileDir[dir])
      if (splitFileDir[dir] == '')
        break
      sdir.push(splitFileDir[dir])
    }
    splitFileDir = sdir
    console.log(splitFileDir)
    // if(splitFileDir.slice(0,-2).length>=1){
    //   this.parentDir = splitFileDir.slice(0,-2).join('/')+'/'
    //   return this.parentDir
    // }
    // else{
    //   this.parentDir = splitFileDir.slice(0,-1).join('/')+'/'
    //   return this.parentDir
    // }
    if (splitFileDir.length == 1)
      return this.now
    this.parentDir = splitFileDir.slice(0, -1).join('/') + '/'
    return this.parentDir
  }
}

module.exports = Pane
