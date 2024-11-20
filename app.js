const { app, BrowserWindow, ipcMain, WebContentsView, BaseWindow, BrowserView } = require('electron');
const path = require('path');

let overlayWindow;

function createWindow() {
    // Create the overlay window
    overlayWindow = new BaseWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
        webPreferences: {
          nodeIntegration: true, // Enable Node.js integration
          contextIsolation: false // Disable context isolation
            // preload: path.join(__dirname, 'preload.js') // Optional, if you have a preload script
        }
    });

    overlayWindow.setBounds({ x: 0, y: 0, width: 800, height: 600 });

    const navbarView = new WebContentsView({
      transparent: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Optional, if you have a preload script
        nodeIntegration: true, // Enable Node.js integration
        contextIsolation: false // Disable context isolation
      }
    });

    overlayWindow.contentView.addChildView(navbarView)
    overlayWindow.contentView.children[0].setBackgroundColor('rgba(0, 0, 0, 0)')


    navbarView.webContents.loadFile('index.html');;
    navbarView.webContents.openDevTools({ mode: 'detach' });

    navbarView.setBounds({ x: 0, y: 0, width: 800, height: 600 });
  
    const browserView = new WebContentsView({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Optional, if you have a preload script
        nodeIntegration: true, // Enable Node.js integration
        contextIsolation: false // Disable context isolation
      }
    });

    // Load a URL in the BrowserView
    browserView.webContents.loadURL('https://www.iltalehti.fi/');

    // Set the bounds for the BrowserView
    browserView.setBounds({ x: 0, y: 46 , width: 800, height: 550 });

    overlayWindow.contentView.addChildView(browserView)

    // Handle the IPC event to set the window on top
    ipcMain.on('set-window-on-top', (event, windowName, isOnTop) => {
      if (windowName === 'overlayWindow') {
          if (isOnTop) {
            overlayWindow.contentView.addChildView(navbarView)
          } else {
            overlayWindow.contentView.addChildView(browserView)
          }
      }
    });
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
