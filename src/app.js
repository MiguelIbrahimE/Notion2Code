const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const createMainWindow = require('./ui/mainWindow');

// Prevent multiple instances
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let mainWindow;

app.whenReady().then(() => {
  mainWindow = createMainWindow();

  // On macOS, recreate window when clicking dock icon
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createMainWindow();
    }
  });
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
