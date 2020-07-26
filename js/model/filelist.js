var Fs = require('./file')
const FileFactory = Fs.FileFactory
var common = require('../common')
var Filter = require('../common/filter')
var fs = require('fs')
const hidefile = require('hidefile')

class AbstractFileList {
  constructor () {
    this.filelist = [] // item of filelist is the instance of class File or Folder
    this.fileorder = [] // order of file list
    this.isShowList = [] // 0: hide, 1: show
    this.fileSelected = [] // 1: selected, 0: is not selected
  }

  async getFileList (dir) {}
  getDirList () {}
  getNameList () {}
  filter (str) {}
  sort (sortStr) {}
}

class FileList extends AbstractFileList {
  getDirList () {
    this._dirlist = []
    for (const key of this.filelist.keys()) {
      this._dirlist[key] = this.filelist[key].dir
    }
    return this._dirlist
  }

  getNameList () {
    this._namelist = []
    for (const key of this.filelist.keys()) {
      this._dirlist[key] = this.filelist[key].name
    }
    return this._namelist
  }

  async getFileList (dir) {
    this.filelist = []
    const files = await fs.promises.readdir(dir)
    var k = 0
    for await (const filename of files) {
      // get dirent type, show type 2 file or folder
      var filedir = dir + filename
      // electron can't use promises.opendir, then can't get fs.dirent
      // system files are not alowed get stats, then use try
      try {
        var result = hidefile.shouldBeHiddenSync(filedir)
        if (result) {
          // console.log(filedir)
        } else {
          // if file is not hide, add file to fileList
          const stats = await fs.promises.stat(filedir)
          // try {
          //   const stats = fs.promises.stat(filedir)
          // } catch (err) {
          //   console.log(err)
          //   continue
          // }
          var filesize = ''
          var filetype = ''
          if (stats.isDirectory()) {
            filetype = 'folder'
            filesize = '--'
          } else {
            filetype = 'file'
            filesize = common.fileSizeFormat(stats.size)
          }

          this.filelist[k] = new FileFactory(filetype, dir)
          this.filelist[k].dir = filedir
          this.filelist[k].name = filename
          this.filelist[k].type = filetype
          this.filelist[k].size = filesize
          this.filelist[k].atime = common.dateFormat(stats.atime)

          k = k + 1
        }
      } catch (err) {
        // console.error(err)
      }
    }
  }

  filter (keyword) {
    var nameList = []
    for (const key of this.filelist.keys()) {
      nameList[key] = this.filelist[key].name
    }
    this.isShowList = Filter(nameList, keyword)
  }
}

module.exports = FileList
