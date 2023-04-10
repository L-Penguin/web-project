import axios_diy from './axios_diy'

const client = {}

client.getImgsData = function(num, callback) {
    axios_diy.get(`imgRouter/getImgsData?num=${num}`).then(res => {
        if (res) callback(res)
    })
}

client.getInfoTotal = function(ID, callback) {
    axios_diy.get(`infoRouter/getInfoTotal?ID=${ID}`).then(res => {
        if (res) callback(res)
    })
}

client.getInfoTable = function(ID, page, page_size, callback) {
    axios_diy.get(`infoRouter/getInfoTable/${ID}/${page}/${page_size}`).then(res => {
        if (res) callback(res)
    })
}

client.delInfoByGroupID = function(group_id, callback) {
    axios_diy.delete(`infoRouter/delInfoByGroupID/${group_id}`).then(res => {
        if (res) callback(res)
    })
}

client.getGroupButton = function(callback) {
    axios_diy.get(`infoRouter/getGroupButton`).then(res => {
        if (res) callback(res)
    }) 
}

export default client