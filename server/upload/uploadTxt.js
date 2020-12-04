const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req);
    res.send({
        code: 200,
        msg: "",
        data: '上传成功',
    });
});
module.exports = router;