const Fs = require('../model/file')
const File = Fs.File
const Folder = Fs.Folder

class PaneView {
  constructor () { }
  showFiles () { }
  addOnclick () { }
  addOndblclick () { }
}

class panView extends PaneView {
  constructor (panename, pane) {
    super()
    this.dir = pane.dir
    this.pane = pane
    this.files = ''
    this.panename = panename
    this.paneId = document.getElementById(panename + 'InfList')
    this.fileItems = document.getElementsByClassName('name' + panename)
    this.key = 0
  }

  async showFiles () {
    await this.pane.refresh()
    this.files = this.pane.files
    // add file list in html
    var paneInnerText = ''
    var nameClassStr = ''
    var sizeStr = ''
    var dateStr = ''
    for (let i = 0; i < this.files.length; i++) {
      const filename = this.files[i].name
      const filesize = this.files[i].size
      const filedate = this.files[i].atime
      nameClassStr = "<td class='name" + this.panename + "'>" + filename + '</td>'
      sizeStr = "<td class='size'>" + filesize + '</td>'
      dateStr = "<td class='date'>" + filedate + '</td>'

      if (this.files[i].hide) {
        paneInnerText = paneInnerText + "<tr class = 'filelist hide'>" + nameClassStr + sizeStr + dateStr + '</tr>'
      } else { paneInnerText = paneInnerText + "<tr class = 'filelist'>" + nameClassStr + sizeStr + dateStr + '</tr>' }
    }
    this.paneId.innerHTML = paneInnerText
    // add onclick and ondbclick
    this.addOnclick()
    this.addOndblclick()
  }

  addOnclick () {
    this.refreshFolder()
    for (let i = 0; i < this.fileItems.length; i++) {
      this.fileItems[i].parentNode.addEventListener('click', () => {
        this.key = i
        this.click(i)
      })
    }
  }

  addOndblclick () {
    this.refreshFolder()
    for (let i = 0; i < this.fileItems.length; i++) {
      this.fileItems[i].addEventListener('dblclick', () => {
        this.key = i
        this.openFileOrFolder()
      })
    }
  }

  refreshFolder () {
    this.fileItems = document.getElementsByClassName('name' + this.panename)
  }

  openFileOrFolder () {
    if (this.files[this.key] instanceof File) {
      this.files[this.key].open()
    } else if (this.files[this.key] instanceof Folder) {
      this.pane.dir = this.files[this.key].dir + '/'
      this.dir = this.pane.dir
      console.log('open' + this.pane.dir)
      this.showFiles()
    }
  }

  unselect (i) {
    this.fileItems[i].parentNode.classList.remove('highlight')
  }

  click (i) {
    this.clearSelected()
    this.fileItems[i].parentNode.classList.add('highlight')
  }

  clearSelected () {
    for (let i = 0; i < this.fileItems.length; i++) {
      this.unselect(i)
    }
  }
}

module.exports = panView
