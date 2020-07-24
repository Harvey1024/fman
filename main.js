const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const Menu = electron.Menu

const path = require('path')

var mainWindow = null

// const qcmd = require('./js/quickcmd')

// var dirlog = new qcmd.dirSumList()

// quit while closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// eletron initializetion, create window
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800 + 39,
    webPreferences: {
      nodeIntegration: true
    }
  })
  Menu.setApplicationMenu(null)
  // dirlog.readDirs()
  // load index.html
  var filepath = path.join(__dirname, 'index.html')
  mainWindow.loadURL('file://' + filepath)
  // opem developmemt tools
  mainWindow.openDevTools()

  // when window closed
  mainWindow.on('closed', function () {
    mainWindow = null
    // dirlog.test()
  })
})
