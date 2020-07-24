var FileList = require('./filelist')
const Dir = require('./dir')

class AbastractPane {
  constructor () {
    this.filelist = new FileList()
    this.files = []
    this.dirObj = new Dir()
  }

  refresh () {}
  getState () {}
  setState () {}
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
  }

  getState () {

  }

  setState () {

  }
}

module.exports = Pane
