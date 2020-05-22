const fs = require('fs')
class dirSum {
  constructor(count, dir) {
    this.dir = dir
    this.count = count
  }
  increase() {
    this.count = this.count + 1
  }
  sort() {

  }
}

class quickcmd {
  constructor() {
    this.cmdlist = []
    this.cmd = ''
  }
  run(cmd, mainp, folder, fSelected) {
    this.cmd = cmd
    this.mainp = mainp
    var transCmd = this.cmd.split(' ')

    //creat new folder
    if (transCmd[0]=='mkdir') {
      var newfoldername = [folder,transCmd[1]].join('/')
      this.newfolder(newfoldername)
    }
    //creat new file
    if (transCmd[0]=='newfile') {
      var newfilePath = [folder,transCmd[1]].join('/')
      this.newfile(newfilePath)
    }
  }
  newfile(newfilePath){
    fs.open(newfilePath,'wx',(err,fd)=>{
      if(err){
        // file that need to be created exist.
        console.err(err)
      }
      else{
        this.refreshDir()
        fs.close(fd,(err)=>{
          // console.log('file closed')
        })
      }
    })
    //close the file

  }
  newfolder(dir) {
    let paths = dir.split('/')
    console.log(paths)
    let index = 1;
    this.newfolder_next(index, paths)    
  }
  refreshDir(){
    var dirNow = this.mainp.activepane.dirs.now
    this.mainp.activepane.showList(dirNow,1)
  }
  newfolder_next(index, paths) {
    if (index > paths.length)
      return 0
    let newPath = paths.slice(0, index).join('/')
    console.log(newPath)
    fs.access(newPath, (err) => {
      if (err) {
        //folder not exist, then creat this folder
        console.log('not exist')
        console.log(newPath)
        fs.mkdir(newPath, (err) => {
          this.newfolder_next(index + 1, paths)
          this.refreshDir()
        })
      }
      else {
        //if exist, next
        console.log('exist')
        this.newfolder_next(index + 1, paths)
      }
    })

  }
}

class dirSumList {
  constructor() {
    this.dirSumList = []
  }
  readDirs() {
    var dirlist = []
    fs.readFile('dirlog.log', (err, data) => {
      console.log(data)
      dirlist = data.toString().split('\n')
      console.log(dirlist)
      for (var i of [...Array(dirlist.length).keys()]) {  // creat list(range(n))
        if (dirlist[i].charCodeAt(dirlist[i].length - 1) == 13) {
          dirlist[i] = dirlist[i].slice(0, dirlist[i].length - 1)
        }
        dirlist[i] = dirlist[i].split('\t')
        this.dirSumList[i] = new dirSum(+dirlist[i][0], dirlist[i][1])  //+string : transfer string to number
      }
      console.log(this.dirSumList)

    })
  }
  writDirs() {
    var data = ''
    for (var i of [...Array(this.dirSumList.length).keys()]) {
      data = data + dirSumList[i][0] + '\t' + dirSumList[i][1] + '\n'
    }
    fs.writeFile('dirlog.log', data, (err) => { console.log(err) })
  }
  add() {

  }
}


module.exports = {
  dirSum,
  quickcmd,
  dirSumList
}