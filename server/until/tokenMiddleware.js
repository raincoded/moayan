const { pathToRegexp } = require('path-to-regexp')
// 用户解析token
module.exports = (req, res, next) => {
    // 根据路径判断是否需要token,查询不到则不需要
    const isNeed = /admin/g.test(req.path);
    // 为0表示不需要令牌
    if (!isNeed) {
        next()
        return
    }
    // 从cookie或header中获取
    let token = req.cookies.token ? req.cookies.token : req.headers.authorization;
    if (!token) { // 没有认证
        console.log('token', token);
        // 如果你现在是要登录，那么登录吧，否则提示请登录
        if (/login/g.test(req.path)) {
            console.log('路径是登录');
            next()
        } else {
            throw new Error('请登录!')
        }
    } else {
        const crypt = require('./crypt')// 解密
        req.userId = crypt.decrypt(token.toString());//
        next()
        return
    }
}







// // 用户解析token
// module.exports = (req, res, next) => {
//     // 根据路径判断是否需要token,查询不到则不需要
//     const apis = needTokenApi.filter(api => {
//         const reg = pathToRegexp(api.path);
//         return api.method == req.method && reg.test(req.path)
//     })
//     // 为0表示不需要令牌
//     if (apis.length === 0) {
//         next()
//         return
//     }
//     // 从cookie或header中获取
//     let token = req.cookies.token ? req.cookies.token : req.headers.authorization;
//     if (!token) { // 没有认证
//         console.log('token', token);
//         // 如果你现在是要登录，那么登录吧，否则提示请登录
//         if (req.url == '/api/user/login') {
//             console.log('路径是登录');
//             next()
//         } else {
//             throw new Error('请登录!')
//         }
//     } else {
//         const crypt = require('./crypt')
//         req.userId = crypt.decrypt(token.toString());
//         next()
//     }
// }