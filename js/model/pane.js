var FileList = require('./filelist')
const Dir = require('./dir')

class AbastractPane {
  constructor (fman) {
    this.filelist = new FileList()
    this.files = []
    this.dirObj = new Dir()
    this.observerList = []
    this.fman = fman
  }

  refresh () {}
  getObserver () {}
  attachObserver () {}
}

class Pane extends AbastractPane {
  set dir (d) {
    this._dir = d
    this.dirObj.dir = d
    this.pre = this.dirObj.pre
  }

  get dir () {
    return this._dir
  }

  async refresh () {
    await this.filelist.getFileList(this.dir)
    this.files = this.filelist.filelist
    this.notify()
  }

  notify () {
    for (const obser of this.observerList) {
      obser.update(this.files, this.dir)
    }
  }

  getObserver () {
    return this.observerList
  }

  attachObserver (obser) {
    if (this.observerList.indexOf(obser) === -1) {
      this.observerList.push(obser)
    }
  }
}

module.exports = Pane
