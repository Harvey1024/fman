console.log("hello")
var FileList = require("./filelist")
var Filter = require('../common/filter')

var Fman = require('./fman')

// f = new FileList()
// console.log("hello")
// async function get(){
//     await f.getFileList("D:/")
//     await console.log("ok")
//     await f.filter('so')
//     await console.log(f.isShowList)
// }

// get()
fman = new Fman()
fman.leftdir = 'C:/'
fman.rightdir = 'D:/'
async function get(){
    await fman.init()
    await console.log("left")
    await console.log(fman.leftpane.filelist.getDirList())
    await console.log("ritght")
    await console.log(fman.rightpane.filelist.getDirList())
}
get()