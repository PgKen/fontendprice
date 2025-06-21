const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const isDev = !app.isPackaged; // isPackaged = true เมื่อ build production

  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:3000'); // โหลด React dev server
    win.webContents.openDevTools(); // เปิด devtools อัตโนมัติ
  } else {
    win.loadFile(path.join(__dirname, '../build/index.html')); // โหลดไฟล์ build
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});