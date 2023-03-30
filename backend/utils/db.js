const database = require('./mysql');

Date.prototype.CompareNow = function(minutes) {
	const nowTime = new Date();
	if ((nowTime.getTime() - this.getTime()) < minutes * 60 * 1000) {
		return true;
	} else {
		return false;
	}
}

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

exports.getInfoTotal = function(ID, callback) {
    const sql = `SELECT COUNT(id) count FROM terminal_data WHERE terminal_id = ${ID};`;
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`)
        callback(err, data)
    })
}

exports.getInfoTable = function(ID, page, page_size, callback) {
    const sql = `SELECT terminal_id, time, data, state FROM terminal_data WHERE terminal_id = ${ID} ORDER BY id DESC LIMIT ${(page-1)*page_size}, ${page_size}; `;
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`)
        callback(err, data)
    })
}

exports.getImgData = function(num, callback) {
    const sql = `SELECT t.* FROM (SELECT terminal_id,MAX(TIME) AS create_time FROM terminal_data GROUP BY terminal_id) a LEFT JOIN terminal_data t ON t.terminal_id=a.terminal_id AND t.time=a.create_time;`;
    console.log(`sql: ${sql}`);
    database.query(sql, (err, data=null) => {
        if (err) console.log(`error: ${err}`);
        if (data) {
            // 过滤
            const filterObj = {}
            // console.log(data)
            data = data.filter(({terminal_id}) => {
                if (filterObj.terminal_id > num) return false;
                if (filterObj.terminal_id) {
                    return false;
                } else {
                    filterObj[terminal_id] = true;
                }
                return true
            })

            // 排序
            data.sort((o1, o2) => o1.terminal_id - o2.terminal_id)

            data.map(obj => {
                const str = JSON.stringify(obj.time);
                const time = new Date(...str.FormatTime());
                if (!time.CompareNow(10000)) {
                    obj.data = './unconnected.jpg'
                    obj.state = -1
                }
                return obj;
            })
        }
        callback(err, data);
    })
}