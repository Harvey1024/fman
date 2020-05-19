const fs = require('fs')
const common = require('./common')
class folder {
  constructor(folderdir) {
    this.dir = folderdir
    this.type = 'folder'
    this.folderlist = []
    this.stat = ''
    this.filesize = ''
    this.filedate = ''
  }
  async getfilestate() {
    try {
      const stats = await fs.promises.stat(this.filedir)
      if (stats.isDirectory()) {
        this.filetype = 'folder'
        this.filesize = '--'
      } else {
        this.filetype = 'file'
        this.filesize = common.fileSizeFormat(stats.size)
      }
      this.filedate = common.dateFormat(stats.atime)
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = folder