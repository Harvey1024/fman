var FileList = require('./filelist')

class AbastractPane {
  constructor () {
    this.filelist = new FileList()
    this.dir = ''
    this.files = []
  }

  refresh () {}
  getState () {}
  setState () {}
}

class Pane extends AbastractPane {
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
