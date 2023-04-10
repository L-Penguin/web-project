import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由懒加载
function resolveView(view) {
	return () => import(`@/views/${view}`)
}

const routes = [
	{
		path: '/',
		name: 'home',
		component: resolveView('Home'),
		meta: {
			title: '首页',
		}
	},
	{
		path: '/InfoTable',
		name: 'infoTable',
		component: resolveView('InfoTable'),
		meta: {
			title: '信息展示页',
		}
	},
	{
		path: '/InfoControl',
		name: 'infoControl',
		component: resolveView('InfoControl'),
		meta: {
			title: '信息操作页',
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
