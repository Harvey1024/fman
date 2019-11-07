var fs = require("fs");

// filelist=[];
fs.readdir("/",function(err, files){
   if (err) {
       return console.error(err);
   }
   // files.forEach( function (file){
       // console.log( file );
   // });
   filelist=files;
   // console.log( files);
});
console.log(filelist)