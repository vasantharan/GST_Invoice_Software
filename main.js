const { app, BrowserWindow, dialog, screen } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'build' });
let mainWindow;
function isDev() {
    return !app.isPackaged;
}
function createWindow() {
    mainWindow = new BrowserWindow({
        width: screen.width,
        height: screen.height,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        },
        icon: isDev() ? path.join(process.cwd(), 'public/logo512.png') : path.join(__dirname, 'build/logo512.png'),
        show: false
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:3000/');
    } else {
        loadURL(mainWindow);
    }
    mainWindow.on('closed', function () {
        mainWindow = null
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
}   
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});
