// 使用对称加密算法：aes算法 128位
// 128位的秘钥
// Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8) // 提取长度为16的随机数
// Math.random().toString(36) 将随机数转成36进制，有数字和字母
const secret = Buffer.from("mm7h3ck87ugk9l4a");// 密钥
const crypto = require("crypto");// 一个加密算法库，node内置的
// const results = crypto.getCiphers(); // 获取crypto中所有的算法
// 准备一个iv，随机向量
const iv = Buffer.from("jxkvxz97409u3m8c");// 开发时，我们用固定的iv，要不然每次重启服务器都时新的，以前的又拿不到
// 密钥配一个向量，一般密钥固定，向量不固定，解密时用同样的密钥和同样的向量解密，避免密钥泄密后还有一个向量保障
// 更安全些的加密， 每次都是一个新的iv
// module.exports = function () {
//     // 准备一个iv，随机向量
//     const iv = Buffer.from("jxkvxz97409u3m8c");
//     return {
//         encrypt(str) {
//             // 加密字符串
//         },
//         decrypt(signed) {
//             // 解密
//         }
//     }
// }
// 加密字符串
exports.encrypt = function (str) {// 参数str必须是字符串
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv); // 参数表示:(算法名,密钥,iv),返回一个加密函数
    let result = cry.update(str, "utf-8", "hex"); // 参数:(谁要加密,传入类型,加密类型) hex表示16进制
    result += cry.final("hex"); // 参数:(加密类型) 需拼接自己
    return result;
};

// 解密
exports.decrypt = function (str) {  // 加密后的字符串
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    let result = decry.update(str, "hex", "utf-8"); // 参数:(谁要解密,加密类型,输出类型) 
    result += decry.final("utf-8");
    return result;
};


