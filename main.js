'use strict'
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300, height: 250,
    "web-preferences" : {
      "web-security" : false
    }
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', function electronMainWindowClosed() {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function electronWindowsClosed() {
    app.quit()
})

app.on('activate', function electronAppActivated() {
  if (mainWindow === null) createWindow()
})
