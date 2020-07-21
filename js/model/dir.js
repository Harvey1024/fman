
class AbstractDir {
  constructor () {
    this.previous = ''
  }

  formate () {}

  previous () {}
}

class Dir extends AbstractDir {
  set dir (d) {
    this._dir = d
    this.previous = this.previous()
  }

  get dir () {
    return this._dir
  }

  formate () {
    // if filename contain space, add "" for filename.
    var splitFileDir = this.dir.split('/')
    for (let j = 0; j < splitFileDir.length; j++) {
      if (splitFileDir[j].indexOf(' ') !== -1) { splitFileDir[j] = '"' + splitFileDir[j] + '"' }
    }
    return splitFileDir.join('/')
  }

  previous () {
    var splitFileDir = this.dir.split('/')
    console.log(splitFileDir)
    var sdir = []
    for (var dir in splitFileDir) {
      console.log(splitFileDir[dir])
      if (splitFileDir[dir] === '') { break }
      sdir.push(splitFileDir[dir])
    }
    splitFileDir = sdir

    if (splitFileDir.length === 1) { return this.now }
    var parentDir = splitFileDir.slice(0, -1).join('/') + '/'
    return parentDir
  }
}

module.exports = Dir
