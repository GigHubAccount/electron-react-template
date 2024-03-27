const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const { exec } = require("child_process");

const preloadPath = path.resolve(__dirname, "../../public/loading.html");

let mainWindow;

function createWindow() {
    // mainWindow = new BrowserWindow({
    //   width: 800,
    //   height: 600,
    //   webPreferences: {
    //     nodeIntegration: true
    //   }
    // });
    mainWindow = new BrowserWindow({
        title: "项目名称",
        // icon: path.join(__dirname, "./public/favicon.ico"),
        width: 1348,
        minWidth: 1082,
        height: 838,
        minHeight: 686,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, "./process/preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
            contentSecurityPolicy: "default-src 'self'",
        },
    });
    mainWindow.loadFile(preloadPath);
    mainWindow.webContents.loadURL(`http://localhost:3000/index`);

    mainWindow.webContents.openDevTools();

    // mainWindow.loadURL(
    //   url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    //     slashes: true
    //   })
    // );

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// app.on("notification", function () {
//     console.log(123456);
//     // new Notification({
//     //     title: "info",
//     //     body: "123456",
//     // }).show();
//     mainWindow.hide();
// });

ipcMain.on("runExe", (event) => {
    const exePath = path.join(__dirname, "./testExe.exe");
    console.log(exePath);

    // 执行 exe 文件
    exec(exePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行错误: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`执行警告: ${stderr}`);
            return;
        }
        console.log(`执行成功: ${stdout}`);
    });
});
