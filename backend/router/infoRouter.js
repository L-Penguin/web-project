const express = require('express');
const db = require('../utils/db');

const router = express.Router();


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
            res.status(200).send(data)
        } else {
            res.status(404).send({
                msg: "get imgs data failed as request error"
            })
        }
    })
})

router.delete('/delInfoByGroupID/:group_id', function(req, res) {
    const {group_id=null} = req.params;
    if (!group_id) {
        console.log(`delInfoByGroupID error: wrong group_id: ${group_id}`)
        res.status(404).send({
            msg: "delete info by group_id failed as wrong group_id"
        })
        return;
    }
    db.delInfoByGroupID(group_id, function(err, data) {
        if (err) {
            res.status(500).send({
                msg: "delete info by group_id failed as server error"
            })
        } else if (data) {
            res.status(200).send(data)
        } else {
            res.status(404).send({
                msg: "delete info by group_id failed as request error"
            })
        }
    })
})

module.exports=router