// file double click function
function filedblclickfun () {
  filebtns = getfilebtns()
  if (!key) {
    var fileid = 'Lfile'
  } else {
    var fileid = 'Rfile'
  }
  for (let i = 0; i < filebtns.length; i++) {
    const mykey = key
    filebtns[i].addEventListener('dblclick', function () {
      key = mykey
      refreshDirnow()
      var btn = document.getElementById(fileid + i.toString())
      if (btn.classList[1] == 'folder') {
        // if folder, open folder and show file list in folder
        showList(dirnow[key] + btn.innerText + '/')
        resetCursor()
      } else {
        // if file, open file by default program of system
        exec('start' + ' ' + dirnow[key] + '/' + btn.innerText)
        console.log('this is file ' + btn.id)
      }
    })
  }
  console.log('click setted')
}
