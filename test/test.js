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
   // console.log(stats["atime"].toString().slice(16,21));
   var datestring=stats["atime"].toString().slice(4,21);
    var fileMonth=datestring.slice(0,3);
    switch(fileMonth){
        case "Jan":
            fileMonth="01";
            break;
        case "Fan":
            fileMonth="02";
            break;
        case "Jan":
            fileMonth="03";
            break;
        case "Mar":
            fileMonth="04";
            break;
        case "Jan":
            fileMonth="05";
            break;
        case "Apr":
            fileMonth="06";
            break;
        case "May":
            fileMonth="07";
            break;
        case "Jum":
            fileMonth="08";
            break;
        case "Jul":
            fileMonth="09";
            break;
        case "Aug":
            fileMonth="10";
            break;
        case "Nov":
            fileMonth="11";
            break;
        case "Dec":
            fileMonth="12";
            break;
    }
    var fileDay=datestring.slice(4,6);
    var fileYear=datestring.slice(7,11);
    var fileHour=datestring.slice(12,17);
    console.log(fileYear+'/'+fileMonth+'/'+fileDay+' '+fileHour)
   console.log("读取文件信息成功！");
   
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});