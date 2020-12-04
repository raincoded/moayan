// 处理错误的中间件
const getMsg = require("./getSendResult");
module.exports = (err, req, res, next) => {
  if (err) {
    const errObj = err instanceof Error ? err.message : err;
    //发生了错误
    console.log('发生了错误', errObj);
    res.send(getMsg.getErr(errObj));
  } else {
    next();
  }
};
