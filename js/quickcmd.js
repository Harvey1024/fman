const fs = require('fs')
class dirSum {
  constructor(count, dir) {
    this.dir = dir
    this.count = count
  }
  increase() {
    this.count = this.count + 1
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
        if(dirlist[i].charCodeAt(dirlist[i].length-1)==13){
          dirlist[i] = dirlist[i].slice(0, dirlist[i].length-1)
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
    fs.writeFile('dirlog.log',data, (err)=>{console.log(err)})
  }
  add(){

  }
}

module.exports = {
  dirSum,
  dirSumList
}