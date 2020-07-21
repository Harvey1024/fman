const Dir = require('./dir')

var exec = require('child_process').exec

class AbstractFile {
  constructor (filedir) {
    this.name = ''
    this.size = ''
    this.sizeUnit = ''
    this.type = ''
    this.atime = ''
    this.fulldir = filedir
    this.dir = new Dir()
  }

  rename () { }
  delet () { }
  async open () { }
  async openwith () { }
}

class File extends AbstractFile {
  constructor (filedir) {
    super(filedir)
    this.dir.dir = filedir
  }

  async open () {
    console.log('open ' + this.dir)
    await exec(this.dir)
  }
}

class Folder extends AbstractFile {
  constructor (folderdir) {
    super(folderdir)
    this.dir.dir = folderdir
  }
}

class FileFactory {
  constructor (type, filedir) {
    if (type === 'file') {
      return new File(filedir)
    } else if (type === 'folder') {
      return new Folder(filedir)
    }
  }
}
module.exports = {
  FileFactory,
  File,
  Folder
}
