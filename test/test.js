var fs = require("fs")

var fileList = []
async function print(path) {
  const dir = await fs.promises.opendir(path);
  var k = 0;
   for await (const dirent of dir) {
	   // console.log(dirent);
	   const filedir = path+dirent.name;
	   const dirtype = dirent[Object.getOwnPropertySymbols(dirent)[0]];
	   if(dirtype == 2){
		   try{
			const stats = await fs.promises.stat(filedir)
				if(stats.isDirectory())
					var filetype = "folder";
				else if(stats.isFile())
					var filetype = "file";
				else
					var filetype = "other"
				fileList[k++] = new file(dirent.name, filedir, filetype,stats.size, stats.atime)
				// console.log(stats)
		   }catch(err){
			   console.error(err);
		   }
	   }
		else{
			console.log(dirent.name+" not 2")
		}
  }
  console.log(fileList)
}

class file{
	constructor(name, dir, type, size, atime){
		this.name = name
		this.dir = dir;
		this.type = type;
		this.size = size;
		this.atime = atime;
	}
}
// print("c:/users/cnanli21/onedrive/web/fman/")
print("c:/users/")