const { app, webContents, BrowserWindow, globalShortcut } = require('electron');
const path = require('path')

/* Recargar aplicación cada vez que se modifica un archivo, o se agrega a el proyecto */

  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });

/* Recargar aplicación cada vez que se modifica un archivo, o se agrega a el proyecto */


function createWindow () {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    }
  })


  mainWindow.webContents.setWindowOpenHandler((details) => {
    let json = JSON.parse(details.features); 
    if (details.url === 'about:blank') {
      const modalWin = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        center: true,
        width: json.width,
        height: json.height,
        minWidth: json.width,
        minHeight: json.height,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          nativeWindowOpen: true,
        }
      })

      switch(details.frameName){
        case 'modal_uno':
            modalWin.loadFile('modales/modal_uno/modal.html')
          break;
        case 'modal_dos':
            modalWin.loadFile('modales/modal_dos/modal.html')
          break;
        default:
            console.log('El modal "%s" no esta registrado.', details.frameName);
            modalWin.destroy();
          break;
      }
    }

    return { action: 'deny' };

  })

  mainWindow.loadFile('index.html')

}

app.whenReady().then(() => {

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  /* disable commands */
  // globalShortcut.register('CommandOrControl+R', () => {})
  // globalShortcut.register('CommandOrControl+Shift+R', () => {})
  // globalShortcut.register('F5', () => {})
  
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

module.exports = app;