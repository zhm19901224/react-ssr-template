
import express from 'express'
import { render } from './utils.js'
import { getStore } from '../store/index'
import { matchRoutes } from 'react-router-config'  // 用于匹配二级别以上路由
import routes from '../Router/routes'
import proxy from 'express-http-proxy'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express()
app.use(express.static('public'))
app.use('/api', createProxyMiddleware({ 
    target: 'http://47.95.113.63',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/ssr/api', // rewrite path
    },
}))

app.get('*', (req, res) => {
    const store = getStore()
    const promises = []
    // 根据用户请求的路由，匹配具体的路由配置，找到具体要加载的组件，上面已经挂载了loadData方法，调用其方法填充store数据。！！！！
    const matchedRoutes = matchRoutes(routes, req.path);

    matchedRoutes.forEach(({ route }) => {
        if (route.loadData) {
            promises.push(route.loadData(store))
        }
    })


    Promise.all(promises).then(() => {
        const html = render(store, routes, req);
        const find = routes.find(route => (route.path === req.path))
        if (!find) res.status(404)
        res.send(html);
    })
})

app.listen(3000)