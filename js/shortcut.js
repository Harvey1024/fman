var cm = require('./js/common')
var visibleFileNum = []
var visblekey = 0
var filterbegin = 0
var rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
document.onkeydown = function (event) {
  var e = event || window.event || arguments.callee.caller.arguments[0]

  var [panelast, panenow] = getPane()

  var inputvalue = panenow.quicknav.children[0].value
  const inputEle = panenow.quicknav
  // ctrl + p

  if (e && e.ctrlKey && e.keyCode == 80) {
    var quickcmd = document.getElementsByClassName('quickcmd')[0]
    quickcmd.classList.remove('hide')
    document.getElementsByClassName('cmdheader')[0].children[0].focus()
  }

  // when key "BackSpace" pressed

  if (e && e.keyCode == 8 && inputvalue == '') {
    // delete last folder
    var dirbackarr = panenow.dirs.now.split('/')
    if (dirbackarr.length > 2) {
      dirbackarr.splice(-2, 1)
      var dirback = dirbackarr.join('/')
      // refresh folder
      panenow.showList(dirback)
    }
  }
  // when key "up arrow" pressed
  else if (e && e.keyCode == 38) {
    e.preventDefault() // prevent previeous scroll event
    var cursorPosNow = panenow.key - 1
    // if first file is visibale, first file is invisible.
    // when cursorPosNow == 0; if file0 hiden, cursor position dosen't change.

    if (cursorPosNow >= 0 & panenow.fileItems[cursorPosNow].parentNode.classList.length == 1) {
      var cursorNext = cursorPosNow
      for (let i = cursorPosNow; i != 0; i--) {
        cursorNext = cursorNext - 1
        if (panenow.fileItems[cursorNext].parentNode.classList.length == 0) { break }
      }
      if (cursorNext != 0) { cursorPosNow = cursorNext } else {
        cursorPosNow = panenow.key
      }
    } else if (cursorPosNow < 0) { // cursorPosNow ==0 and visble.
      cursorPosNow = panenow.key
    }

    panenow.resetCursor(cursorPosNow)
    panenow.fileItems[cursorPosNow].click()
    panenow.fileItems[cursorPosNow].scrollIntoViewIfNeeded()
  }
  // when key "down arrow" pressed
  else if (e && e.keyCode == 40) {
    e.preventDefault() // prevent previeous scroll event
    var cursorPosNow = panenow.key + 1
    if (cursorPosNow <= panenow.fileItems.length - 1) {
      var cursorNext = cursorPosNow
      var nextFileCLlen = panenow.fileItems[cursorPosNow].parentNode.classList.length
      if (nextFileCLlen == 1) { // if hide

      } else {
        cursorPosNow = cursorNext
      }
    } else {
      cursorPosNow = panenow.key
    }
    if (cursorPosNow <= panenow.fileItems.length - 1 & panenow.fileItems[cursorPosNow].parentNode.classList.length == 1) {
      var cursorNext = cursorPosNow
      for (let i = cursorPosNow; i < panenow.fileItems.length - 1; i++) {
        console.log('hide ' + i.toString())
        cursorNext = i
        if (panenow.fileItems[i].parentNode.classList.length == 0) {
          console.log('break ')
          break
        }
      }
      if (cursorNext != panenow.fileItems.length - 1) { cursorPosNow = cursorNext } else {
        cursorPosNow = panenow.key
      }
    } else if (cursorPosNow > panenow.fileItems.length - 1) {
      cursorPosNow = panenow.key
    }
    // if(cursorPosNow>panenow.fileItems.length-1)
    //     cursorPosNow = panenow.fileItems.length-1;
    panenow.resetCursor(cursorPosNow)
    panenow.fileItems[cursorPosNow].click()
    panenow.fileItems[cursorPosNow].scrollIntoViewIfNeeded()
  }
  // when "enter" pressed
  else if (e && e.keyCode == 13) {
    // should be optimize with dblckick function
    const i = panenow.key
    const filedir = panenow.dirs.now + panenow.fileItems[i].innerHTML
    if (panenow.fileList[3][i] == 'folder') {
      // open folder
      panenow.showList(filedir + '/', i)
      // reset filter input and hide input box
      panenow.quicknav.children[0].value = ''
      inputEle.classList.add('hide')
    } else {
      // if file, open file by default program of system
      exec('start' + ' ' + filedir)
    }
  }
  // when key "tap" pressed
  else if (e && e.keyCode == 9) {
    e.preventDefault() // prevent previeous tap event
    panenow.inactive()
    panelast.active()
    if (panelast.quicknav.children[0].value) // if not empty
    { panelast.quicknav.children[0].focus() }
  }
  // esc
  else if (e && e.keyCode == 27) {
    // hide filter box
    filterStr[pane.activepane] = ''
    panenow.quicknav.classList.add('hide')
    visibleFileNum = cm.fileFilter(panenow, filterStr[pane.activepane], panenow.fileList[0])
    document.getElementsByClassName('quickcmd')[0].classList.add('hide')
    panenow.quicknav.children[0].value = ''
  } else {
    filterbegin = 1
    // if filter is hiden, remove class hide
    if (panenow.quicknav.classList[1] == 'hide') {
      panenow.quicknav.classList.remove('hide')
      panenow.quicknav.children[0].focus()
    }
  }
}

function inputFilter () {
  var [panelast, panenow] = getPane()

  var inputvalue = panenow.quicknav.children[0].value
  if (!inputvalue) { // if empty, hide
    panenow.quicknav.classList.add('hide')
  }
  // show files which include string input.
  cm.fileFilter(panenow, inputvalue, panenow.fileList[0])

  // move cursor to first file visible
  for (let i = 0; i < panenow.fileItems.length; i++) {
    if (panenow.fileItems[i].parentNode.classList.length == 0) {
      panenow.resetCursor(i)
      break
    }
  }
}

function getPane () {
  if (Pane.activepane == leftpane.whichPane) {
    var panenow = leftpane
    var panelast = rightpane
  } else {
    var panenow = rightpane
    var panelast = leftpane
  }
  return [panelast, panenow]
}
