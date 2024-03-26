import React from "react";
import myImage from "./img/connect.jpg";
import styles from "./index.module.less";
const electron = window.require("electron");
// const { ipcRenderer } = require("electron");
// import { ipcRenderer } from "electron";

function ShowImage() {
    return (
        <div className={styles.container}>
            <h1>My Component</h1>
            <div className={styles.imageContainer}>
                <img
                    src={myImage}
                    onClick={() => {
                        console.log("Hello Electron React Template!");
                        // 发送消息给主进程执行 exe 文件
                        electron.ipcRenderer.send("runExe");
                    }}
                    alt="My Image"
                    className={styles.centerImage}
                />
            </div>
        </div>
    );
}

export default ShowImage;
