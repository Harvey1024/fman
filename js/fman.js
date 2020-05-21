// var pane = require('./pane')
// var exec = require('child_process').exec

class Fman {
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
  // getter和setter是和类的属性绑定的特殊方法，分别会在其绑定的属性被取值、赋值时调用。
  // 静态方法调用直接在类上进行，不能在类的实例上调用
  get activepane () {
    return this._activepane
  }

  set activepane (whichPane) {
    this._activepane = whichPane
  }

  inactive(i) {
    this.fileItems[i].parentNode.classList.remove('highlight')
    // this.activestate = 0
  }

  active(i) {
    this.fileItems[i].parentNode.classList.add('highlight')

    // this.activestate = 1
    // this.resetCursor(this.key)
    // this.activepane = this.whichPane

    // this.paneId.focus();
  }

  refreshFolder() {
    this.fileItems = document.getElementsByClassName('name' + this.whichPane)
  }

  setDirHeader(dircectory) {
    this.dirEle.innerHTML = dircectory
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

      if(this.fileList[i].hide){
        console.log(this.fileList[i].hide)
        paneInnerText = paneInnerText + "<tr class = 'filelist hide'>" + nameClassStr + sizeStr + dateStr + '</tr>'
      }
      else{
        paneInnerText = paneInnerText + "<tr class = 'filelist'>" + nameClassStr + sizeStr + dateStr + '</tr>'
      }
      
    }

    this.paneId.innerHTML = paneInnerText
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


  resetCursor(i=this.key) {
    // if position is number, hightlight the file selected,
    // if position="hide", none of file is hightlight
    this.clearCursor(this)
    this.refreshFolder()
    this.active(i)
    this.key = i

  }

  clearCursor(anotherPane){
    for (let i = 0; i < anotherPane.fileItems.length; i++) {
      anotherPane.inactive(i)
    }
  }

  static resetWindowHeight() {
    const windowheight = document.documentElement.clientHeight
    const sectionelem = document.getElementsByTagName('section')
    document.getElementsByTagName('main')[0].style.height = windowheight.toString() + 'px'
    sectionelem[0].style.height = (windowheight - 93).toString() + 'px'
    sectionelem[1].style.height = (windowheight - 93).toString() + 'px'
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
  getParentDir(){
    var splitFileDir = this.now.split('/')
    if(splitFileDir.slice(0,-2).length>=1){
      this.parentDir = splitFileDir.slice(0,-2).join('/')+'/'
      return this.parentDir
    }
    else{
      this.parentDir = splitFileDir.slice(0,-1).join('/')+'/'
      return this.parentDir
    }
    
  }
}
module.exports = Fman
