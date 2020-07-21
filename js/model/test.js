const F = require('./file')
const Fa = F.FileFactory
var f = new Fa('file', 'C:/ab/')
console.log(f.dir)
console.log(f.dirObj.pre)
