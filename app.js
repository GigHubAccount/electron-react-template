/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 13:13:05
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-07 10:45:45
 * @FilePath: \app\app.js
 * @Description: electron 入口文件
 */

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const AppGenerator = require('./process/appGgenerator');
// const createProxyService = require('./process/createProxyService');
const eventMiddleWare = require('./middleware/eventMiddleWare');
const commandMiddleWare = require('./middleware/commandMiddleWare');
const selftStartMiddleWare = require('./middleware/selfStartMiddleWare');
const { getClientEnvironment, getLocalIpAddress } = require('./middleware/utils');

const isDev = !app.isPackaged;
const env = getClientEnvironment(isDev);
const host = getLocalIpAddress() || 'localhost';
const PORT = env.PORT || 3000;

const createWindow = () => {
    // 创建主窗口
    const mainWindow = new BrowserWindow({
        title: 'electron-react-template',
        icon: path.join(__dirname, './public/favicon.ico'),
        width: 1200,
        height: 780,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, './process/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            contentSecurityPolicy: "default-src 'self'"
        }
    });

    // 隐藏菜单
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    // 加载app内容
    mainWindow.loadURL(isDev ? `http://${host}:${PORT}` : `file://${path.join(__dirname, './build/index.html')}`)

    return mainWindow;
}

let loadingWindow;

function createLoadingWindow() {
    loadingWindow = new BrowserWindow({ width: 400, height: 300, transparent: true, frame: false });
    loadingWindow.loadFile(`file://${path.join(__dirname, './build/index.html')}`); // 替换为你自己的 loading 界面 HTML 文件路径
}

app.whenReady().then(() => {
    const win = createWindow();
    createLoadingWindow();
    const $app = AppGenerator.getInstance({
        win,
        isDev,
        port: PORT,
        host
    });
    // 注册事件
    $app.use(eventMiddleWare);
    if (isDev) {
        // 注册快捷键
        $app.use(commandMiddleWare);
        // 自启动 & 热更新模块
        $app.use(selftStartMiddleWare);
        // 开启网关代理
        // $app.use(createProxyService);
        // 默认打开控制台
        win.webContents.openDevTools();
    }
    $app.exec();
});
