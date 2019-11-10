const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const Menu = electron.Menu

const fs = require("fs")

var mainWindow = null;

// quit while closed
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// eletron initializetion, create window
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1400, 
    height: 800+39,
    webPreferences:{
      nodeIntegration: true
    }
  });
  Menu.setApplicationMenu(null)
// load index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');
// opem developmemt tools 
  mainWindow.openDevTools();

//when window closed
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});