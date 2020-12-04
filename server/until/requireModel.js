const path = require('path')
const runPath = process.cwd()// 获取当前的运行路径

module.exports = function (app, apis) {
    apis.forEach(api => {
        // console.log(path.resolve(runPath,'server/project',api.module));
        app.use(api.url, require(path.resolve(runPath,'server/project',api.module)));
    })
}