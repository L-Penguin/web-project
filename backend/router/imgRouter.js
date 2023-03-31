const express = require('express');
const db = require('../utils/db');
const path = require('path')
const fs = require('fs')

const router = express.Router();

function func(data) {
    return data.map(obj => {
        const p = path.join(__dirname, `../dist`, obj.data || 'null')
        console.log(obj.data)
        if (!fs.existsSync(p) && obj.data !== './unconnected.jpg') {
            obj.data = './not found.jpg'
            obj.state = -1
        }
        return obj
    })
}

router.get('/getImgsData', function(req, res) {
    const {num=0} = req.query;
    db.getImgData(num, function(err, data) {
        // 检验data数据合法性
        func(data)
        if (err) {
            res.status(500).send({
                msg: "get imgs data failed as server error"
            })
        } else if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send({
                msg: "get imgs data failed as request error"
            })
        }
    })
})

module.exports=router