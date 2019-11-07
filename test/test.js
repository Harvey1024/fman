var fs = require("fs");

// filelist=[];
// fs.readdir("/",function(err, files){
   // if (err) {
       // return console.error(err);
   // }
   // filelist=files;
// });
// fs.stat("\Users\cquda\OneDrive\Web\fman\index.js",function(err,stats){
	// console.log(stats);
	
// })
var k;
fs.stat('/Users/cquda/OneDrive/Web/fman/main.js', function (err, stats) {
   if (err) {
       return console.error(err);
   }
   console.log(stats["atime"].toString().slice(0,10));
   console.log("读取文件信息成功！");
   
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});