const express = require("express");
const app = express();
const port = 5008;
const path = require("path");
const cookieParser = require("cookie-parser");
// 指定静态资源路径
const runPath = process.cwd()// 获取当前的运行路径
const staticRoot = path.resolve(runPath, "./server/public");

import { plainToClass } from "class-transformer";
// reflect仓库
import "reflect-metadata"
// 初始化数据库，并连接
import './project/movie/initMoviedb'
// 页面重定向
const historyApi = require('connect-history-api-fallback');

// 处理静态资源
app.use(/\/blog$/, express.static(path.join(staticRoot, 'blog')));
app.use(/\/meituan$/, express.static(path.join(staticRoot, 'meituan')));

// 需进行一下配置，要不然会拦截掉所有get请求
app.use('/blog', historyApi({
    rewrites: [
        {
            from: /^blog&/g,// 包含api的给通过
            to: './blog/index.html'
        },
    ]
}))
app.use('/meituan', historyApi({
    rewrites: [
        {
            from: /^\/meituan&/g,// 包含api的给通过
            to: './meituan/index.html'
        },
    ]
}))

// 处理静态资源
app.use(express.static(staticRoot));

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true })); // extended表示是否使用新的qs(querystring)库解析

// 解析 application/json 格式的请求体
app.use(express.json());

// app.set('trust proxy', true);// 处理代理地址

// 使用cookie中间件
// app.use(cookieParser('nihao'));

// 解析token
// app.use(require('./until/tokenMiddleware'))

// 上传文本
app.use("/upload/uploadTxt", require('./upload/uploadTxt'));

// 上传图片
app.use("/upload/uploadImg", require('./upload/uploadImg'));

// 博客请求
// app.use('/blog', require('./project/blog/routes/whoami'), ...require('./project/blog/routes/init'))

// 电影请求
app.use('/movie',...require('./project/movie/router/index'))

// const blogApis = require('./project/blog/routes/init');
// requireModel(app,blogApis)

// 错误中间件
app.use(require('./until/errorMiddleware'))

// 监听端口
app.listen(port, '0.0.0.0', () => {
    console.log(`server listen on ${port}`);
});