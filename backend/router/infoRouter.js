const express = require('express');
const db = require('../utils/db');
const fs = require('fs');
const path = require('path');


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

router.get('/getInfoTotal', function(req, res) {
    const { ID=null } = req.query;
    if (!ID) {
        console.log(`getInfoTotal error: wrong ID: ${ID}`)
        res.status(404).send({
            msg: "get info total failed as wrong ID"
        })
        return;
    }
    db.getInfoTotal(ID, function(err, data) {
        if (err) {
            res.status(500).send({
                msg: "get info total failed as server error"
            })
        } else if (data) {
            res.status(200).json(data[0]?.count)
        } else {
            res.status(404).send({
                msg: "get info total failed as request error"
            })
        }
    })
})


router.get('/getInfoTable/:ID/:page/:page_size', function(req, res) {
    const {ID=null, page=null, page_size=null} = req.params;
    if (!(ID && page && page_size)) {
        console.log(`getInfoTable error: wrong ID: ${ID}, page: ${page} or page_size: ${page_size}`)
        res.status(404).send({
            msg: "get info table failed as wrong ID、page or page_size"
        })
        return;
    }
    db.getInfoTable(ID, page, page_size, function(err, data) {
        if (err) {
            res.status(500).send({
                msg: "get imgs data failed as server error"
            })
        } else if (data) {
            func(data)
            res.status(200).send(data)
        } else {
            res.status(404).send({
                msg: "get imgs data failed as request error"
            })
        }
    })
})

module.exports=router