const fs = require('fs')
const common = require('./common')
class file {
  constructor(filedir) {
    this.dir = filedir
    this.type = 'file'
    this.filename = ''
    this.filetype = ''
    this.filesize = ''
    this.filedate = ''
  }
  async getstats () {
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
  openfile(){

  } 
}

module.exports = file