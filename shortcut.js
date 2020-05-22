var cm = require('./js/common')
const fs = require('fs')
const qcmd = require('./js/quickcmd')
var exec = require('child_process').exec
// var pane = require('./pane')
// var mianpane = require('./js/mainpane')
// var visibleFileNum = []
// var visblekey = 0
var filterbegin = 0
// var rangeArray = (start, end) => Array(end - start + 1).fill(0).map((v, i) => i + start)
class keydown {
  construstor() {
    this.e = ''
    this.inputvalue = ''
    this.mainp = ''
    this.quickcmd = ''
    this.qcmd = ''
  }
  ini(event, mainp) {

    this.mainp = mainp
    this.e = event || window.event || arguments.callee.caller.arguments[0]
    this.inputvalue = mainp.activepane.quicknav.children[0].value
    this.quickcmd = document.getElementsByClassName('quickcmd')[0]
    this.qcmd = new qcmd.quickcmd()
    //backspace
    if (this.press('backspace')) {
      // if quickcmd is hide, back to previous dir
      if (this.quickCmdisHide()) {
        if (this.inputvalue == '')
          mainp.activepane.quicknav.classList.add('hide')
        this.backDir(mainp.activepane, mainp.inactivpane)
      }
      else {

      }

    }

    if (this.press('esc')) {
      this.exit()
    }
    if (this.e.key == 'Enter') {

      // if quickcmd is hide, open file or folder
      if (this.quickCmdisHide()) {
        this.mainp.activepane.openFileOrFolder()
      }
      else {
        console.log('cmd')
        // if quickcmd is active, run
        this.runQcmd()
      }
      this.exit()
    }
    if (this.e.key == 'ArrowUp') {
      this.arrowUporDown('up')
    }
    if (this.e.key == 'ArrowDown') {
      this.arrowUporDown('down')
    }
    if (this.e.key == 'Tab') {
      this.activeAnother()
    }
    if (this.press('sortfiles') && !this.e.ctrlKey && this.quickCmdisHide()) {
      this.sortfiles(mainp.activepane)
    }
    // ctr + P
    if (this.e.ctrlKey && this.e.code == 'KeyP' && !this.e.shiftKey) {
      this.showQuickCmd()
      this.quickDir()
    }
    // ctr + shift + p
    if (this.e.ctrlKey && this.e.code == 'KeyP' && this.e.shiftKey) {
      this.showQuickCmd()
      this.quickCommand()
    }

  }
  runQcmd() {
    var cmdinput = document.getElementById('quickCmdInput').value
    var activeKey = this.mainp.activepane.key
    var selectedFile = this.mainp.activepane.fileList[activeKey]
    var dirNow = this.mainp.activepane.dirs.now
    this.qcmd.run(cmdinput, this.mainp, dirNow, selectedFile)
    // clear input content.
    document.getElementById('quickCmdInput').value = ''
  }
  quickCmdisHide() {
    if (this.quickcmd.classList.length == 2)
      return 1 //hide
    else
      return 0 // not hide
  }
  quickDir() {
    //read dirlog file
    console.log('hello')


  }
  quickCommand() {

  }
  showQuickCmd() {
    this.quickcmd.classList.remove('hide')
    document.getElementsByClassName('cmdheader')[0].children[0].focus()
  }
  backDir(pane, anotherpane) {
    var parentDir = pane.dirs.getParentDir()
    pane.showList(parentDir, anotherpane, 1)
  }
  press(keyWord) {
    if (keyWord == 'backspace') {
      return this.e && this.e.key == 'Backspace' && this.inputvalue == ''
    }
    if (keyWord == 'sortfiles') {
      var KeyCanBeSorted = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890.,-=+'
      return this.e && KeyCanBeSorted.indexOf(this.e.key) != -1
    }
    if (keyWord == 'esc') {
      return this.e && this.e.key == 'Escape'
      console.log('esc')
    }
  }
  sortfiles(panenow) {
    panenow.quicknav.classList.remove('hide')
    panenow.quicknav.children[0].focus()
    this.inputvalue = panenow.quicknav.children[0].value
  }
  filter(panenow) {
    this.inputvalue = panenow.quicknav.children[0].value
    console.log(this.inputvalue)
    if (!this.inputvalue) { // if empty, hide
      panenow.quicknav.classList.add('hide')
    }
    // show files which include string input. and highlight first one.
    var firstfile = cm.fileFilter(panenow, this.inputvalue, panenow.fileList)
    // clear highlight all
    panenow.clearCursor(panenow)
    // highlight fist file
    panenow.active(firstfile)
    // set panenow key
    panenow.key = firstfile
  }
  removeHideAll(panenow) {
    for (let i = 0; i <= panenow.fileItems.length - 1; i++) {
      panenow.fileItems[i].parentNode.classList.remove('hide')
    }
  }
  exit() {
    console.log('exit')
    this.removeHideAll(this.mainp.activepane)
    this.mainp.activepane.quicknav.children[0].value = ''
    this.mainp.activepane.quicknav.classList.add('hide')

    //hide quickcmd box and clear content.
    this.quickcmd.classList.add('hide')
    document.getElementById('quickCmdInput').value = ''
  }
  openFileOrFolder() {
    this.mainp.activepane.openFileOrFolder()
  }
  arrowUporDown(arrow) {
    var panenow = this.mainp.activepane
    this.e.preventDefault() // prevent previeous scroll event
    var cursorPosNow = 0
    if (!this.inputvalue) {
      if (arrow == 'up') {
        cursorPosNow = panenow.key - 1
      }
      else if (arrow == 'down') {
        cursorPosNow = panenow.key + 1
      }
      if (cursorPosNow < 0 || cursorPosNow >= panenow.fileList.length) {
        cursorPosNow = panenow.key
      }
    }
    else {
      // if the files is filtered
      var visibleFileList = this.mainp.activepane.visibleFileList
      if (arrow == 'up') {
        var visblePo = visibleFileList.indexOf(panenow.key) - 1
        if (visblePo >= 0)
          cursorPosNow = visibleFileList[visblePo]
        else
          cursorPosNow = panenow.key
      }
      else if (arrow == 'down') {
        var visblePo = visibleFileList.indexOf(panenow.key) + 1
        if (visblePo <= visibleFileList.length - 1)
          cursorPosNow = visibleFileList[visblePo]
        else
          cursorPosNow = panenow.key
      }

    }
    panenow.fileItems[cursorPosNow].click()
    panenow.fileItems[cursorPosNow].scrollIntoViewIfNeeded()
  }
  activeAnother() {
    var anotherpane = ''
    var panenow = this.mainp.activepane
    if (this.mainp.activepane == this.mainp.panes[0])
      anotherpane = this.mainp.panes[1]
    else
      anotherpane = this.mainp.panes[0]

    this.mainp.activepane = anotherpane

    if (panenow.fileList.length == 0) {
      panenow.inactive(panenow.key)
    }
    else
      anotherpane.fileItems[panenow.key].click()
    // this.mainp.activepane.resetCursor()
  }
}



function keydown2(event, mainp) {
  var e = event || window.event || arguments.callee.caller.arguments[0]
  console.log(e.keyCode)

  var panenow = mainp.activepane

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
  else if (e && e.keyCode === 13) {
    console.log('enter')
    // should be optimize with dblckick function
    const i = panenow.key
    const filedir = panenow.dirs.now + panenow.fileItems[i].innerHTML
    if (panenow.fileList[3][i] == 'folder') {
      // open folder
      console.log(panenow.fileList[3][i])
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

function inputFilter(panenow) {
  // var [panelast, panenow] = getPane()
  // get input box value
  var inputvalue = panenow.quicknav.children[0].value
  console.log(inputvalue)
  if (!inputvalue) { // if empty, hide
    panenow.quicknav.classList.add('hide')
  }
  // show files which include string input.
  cm.fileFilter(panenow, inputvalue, panenow.fileList)

  // move cursor to first file visible
  for (let i = 0; i < panenow.fileItems.length; i++) {
    if (panenow.fileItems[i].parentNode.classList.length == 0) {
      panenow.resetCursor(i)
      break
    }
  }
}

module.exports = keydown
