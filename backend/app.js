/**
 * 💻后端项目
 * 基于express框架
 */
// 导入express框架
const express = require('express');
// 导入POST清求数据解析模块body-parser
const bodyParser = require('body-parser');
// 导入cors解决跨域
const cors = require('cors');
// 导入前端资源路由history问题
const history = require('connect-history-api-fallback');

// package.json中配置项
const config = require('./package').config;
// 加载路由对象
const imgRouter = require('./router/imgRouter');
const infoRouter = require('./router/infoRouter');
// 处理路径模块
const path = require('path')


const app = express()

// 图像静态资源路径
const imgs_path = path.join(__dirname, `../${config.static_path}`)

const port = (function() {
	if (process.argv[2] === '--port' && process.argv[3] && /^\d+$/.test(process.argv[3])) {
		return Number(process.argv[3])
	} else {
		console.log(`invalid params! setting default port ${config.port || 3000}!`);
		return config.port || 3000;
	}
})();

// 使用打包的静态资源访问网页不需要跨域
app.use(cors({
	origin: "*",
	credentials: true
}))

//对POST请求过来的数据进行解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// 解决history路由刷新报错问题
app.use(history());

// 设置后端静态资源访问路径
app.use(express.static(path.join(__dirname, '/dist')));

// 这里将数据库中的图像根目录设置为静态资源访问目录
app.use(express.static(imgs_path))

// 添加路由接口
app.use('/imgRouter', imgRouter)
app.use('/infoRouter', infoRouter)


app.listen(port, err => {
	if (!err) {
        console.log(`Successful Connection at Port: ${port}!`)
    } else {
        console.error(`error happen: ${err}`)
    }
})