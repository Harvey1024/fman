var plantuml = require('node-plantuml')
var fs = require('fs')

var gen = plantuml.generate("fman")
gen.out.pipe(fs.createWriteStream("output-file.png"))
