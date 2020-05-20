// some common function, date frormant, keycode ...

// transform date formate from "Thu Nov 07 2019 18:29:48 GMT+0" to "2019/11/07 18:29"
function dateFormat (date) {
  var year = date.getFullYear().toString().slice(2, 4)
  var month = date.getMonth().toString()
  var day = date.getDate().toString()
  var hour = date.getHours().toString()
  var minutes = date.getMinutes().toString()

  return year + '/' + month + '/' + day + ' ' + hour + ':' + minutes
}

// transform date size from B to GB,M,KB
function fileSizeFormat (size) {
  return size.toString() + 'B'
}

// file filter
function fileFilter (panenow, str, files) {
  // clear highlight
  // panenow.resetCursor()
  var visibleFileList = []
  for (let i = 0; i <= files.length - 1; i++) {
    panenow.fileItems[i].parentNode.classList.remove('hide')
  }
  for (let i = 0, k = 0; i <= files.length - 1; i++) {
    var filename = files[i].name
    
    // for(let j=0; j<str.length-1;j++){

    //     if(filename.toUpperCase().indexOf(str[j])==-1){
    //         panenow.fileItems[i].parentNode.classList.add("hide")
    //         k--;
    //         continue;
    //     }

    // }
    if (filename.toUpperCase().indexOf(str.toUpperCase()) == -1) {
      panenow.fileItems[i].parentNode.classList.add('hide')   
      
    }
    else{
      visibleFileList[k] = i
      k++
    }
    
  }
  // panenow.active(visibleFileList[0])

  const rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
  if (!str) {
    return rangeArray(0, panenow.fileList.length - 1)
  }
  console.log(visibleFileList)
  panenow.visibleFileList= visibleFileList
  return visibleFileList[0]
}
function hello () {
  console.log('hello')
}
module.exports = {
  dateFormat,
  fileSizeFormat,
  fileFilter,
  hello
}
