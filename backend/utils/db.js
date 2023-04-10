const database = require('./mysql');
const path = require('path');
const fs = require('fs');
const static_path = require('../package').config.static_path;

// 图片资源路径所在表
const imgs_table = "image_info";
// 信息数据所在表
const info_table = "check_info"

// 比较时间，单位分钟
Date.prototype.CompareNow = function(minutes) {
	const nowTime = new Date();
	if ((nowTime.getTime() - this.getTime()) < minutes * 60 * 1000) {
		return true;
	} else {
		return false;
	}
}

// 时间格式化
String.prototype.FormatTime = function() {
	const temp = (this.slice(1, this.length-6)).replace("T", "-").replace(/:/g, '-');
	const arr = temp.split('-').map((item, index)=> {
		if (index === 1) {
			return Number(item) - 1;
		} else {
			return Number(item);
		}
	});
	return arr;
}

// 图像静态资源路径
const imgs_path = path.join(__dirname, `../../${static_path}`)

// 根据数据库中所查询的图片资源路径判断是否存在，不存在则展示前端的not found.jpg
const func = function(data) {
    return data.map(obj => {
        if (obj.image_path.includes(static_path)) {
            // 绝对路径转化为相对路径
            obj.image_path = obj.image_path.split(static_path).pop()
            // 图像资源路径不包含:
            obj.image_path = obj.image_path.replace(/[:]/g, '')
        }

        const p = path.join(imgs_path, obj.image_path || 'null')

        if (!fs.existsSync(p) && obj.image_path !== './unconnected.jpg') {
            console.log(`warning: ${p} is not exist! id:${obj.id}; terminal_id:${obj.terminal_id}`)
            obj.image_path = './not found.jpg'
            obj.state = -1
        }
        return obj
    })
} 

// 根据terminal_id查找用有多少条数据
exports.getInfoTotal = function(ID, callback) {
    const sql = `SELECT COUNT(id) count FROM ${imgs_table} WHERE terminal_id = ${ID};`;
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`)
        callback(err, data)
    })
}

// 根据terminal_id和当前页数和每页数据查找数据
exports.getInfoTable = function(ID, page, page_size, callback) {
    const sql = `SELECT terminal_id, time, image_path, state FROM ${imgs_table} WHERE terminal_id = ${ID} ORDER BY id DESC LIMIT ${(page-1)*page_size}, ${page_size}; `;
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`)
        if (data) data = func(data)
        callback(err, data)
    })
}

// 查找所有不同terminal_id的最新数据
exports.getImgData = function(num, callback) {
    const sql = `SELECT t.* FROM (SELECT terminal_id,MAX(TIME) AS create_time FROM ${imgs_table} GROUP BY terminal_id) a LEFT JOIN ${imgs_table} t ON t.terminal_id=a.terminal_id AND t.time=a.create_time ORDER BY a.terminal_id;`;
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`);
        if (data) {
            // 过滤
            const filterObj = {}

            // 只回复所需要的终端数量
            data = data.filter(({terminal_id}) => {
                if (filterObj.terminal_id > num) return false;
                if (filterObj.terminal_id) {
                    return false;
                } else {
                    filterObj[terminal_id] = true;
                }
                return true
            })

            data.map(obj => {
                const str = JSON.stringify(obj.time);
                const time = new Date(...str.FormatTime());
                if (!time.CompareNow(60*24*30000)) {
                    console.log(`id:${obj.id};\tterminal_id:${obj.terminal_id};\ttime:${time}; out of time`)
                    obj.data = './unconnected.jpg'
                    obj.state = -1
                }
                return obj;
            })
            data = func(data)
        }
        callback(err, data);
    })
}

// 根据group_id分类删除check_info表中数据
exports.delInfoByGroupID = function(group_id, callback) {
    const sql = `DELETE FROM ${info_table} WHERE group_id = '${group_id}';`
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`);
        callback(err, data);
    }) 
}

// 查询当前check_info的group_id
exports.getGroupButton = function(callback) {
    const sql = `SELECT DISTINCT(group_id) from ${info_table};`
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`);
        callback(err, data);
    })
}