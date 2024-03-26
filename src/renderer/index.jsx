/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 16:37:44
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-10-07 11:21:31
 * @FilePath: \electron-react-template\src\index.js
 * @Description: 客户端程序入口
 */
import React from "react";
import ReactDOM from "react-dom/client";

import ShowImage from "./components/showImage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <div>
        <ShowImage />
    </div>
);

// Webpack Hot Module Replacement API
if (module?.hot) {
    module?.hot.accept();
}
