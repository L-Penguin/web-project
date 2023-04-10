const express = require('express');
const db = require('../utils/db');
const path = require('path')

const router = express.Router();


router.get('/getImgsData', function(req, res) {
    const {num=0} = req.query;
    // num表示前端需要展示的terminal数量
    db.getImgData(num, function(err, data) {
        if (err) {
            res.status(500).send({
                msg: "get imgs data failed as server error"
            })
        } else if (data) {
            // 检验data数据合法性
            res.status(200).send(data)
        } else {
            res.status(404).send({
                msg: "get imgs data failed as request error"
            })
        }
    })
})

module.exports=router