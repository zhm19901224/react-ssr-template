# react-ssr-template
一个react服务端渲染的模版


#### 只有第一个访问的页面是服务端渲染
服务端渲染完页面后会加载同构代码，包含react、react-router、其他页面的业务组件等等，再次跳转其他页面后，交给前端的BrowserRouter来处理路由


#### 主要文件的作用

> src/server/index.js
1. 服务端入口，exress服务，负责先客户吨返回html
2. createProxyMiddleware做业务接口代理
3. matchRoutes将当前匹配到的路由拿到，调用其loadData方法(既组件的loadData，dispathch异步请求的action)，为store填充数据
！！！获取数据必须借助route.loaderData，因为componentDidMount useEffect这些代码在服务端不会被执行，无法掉接口，所以需要在
router.loadData -> component.loadData 方法内部调用异步接口填充到store，这时候store内有数据了，才能执行render函数。

> src/server/utils.js
1. 导出render函数，分别通过Provider、StaticRouter注入store数据、路由。再由react-dom的renderToString将vdom处理成html字符串
2. StaticRouter是服务端路由，只在第一次访问页面生效，无法拿到前端的location，所以需要传入req.path告诉它当前访问的路径是什么，需要去具体拿哪个组件渲染
3. 将store.getState()服务端获取的接口数据，通过html script window.context.state 的形式注入到前端，这样前端同构时，store里面是有数据的，不会出现空store，渲染闪屏幕


> src/client/index.jsx
1. 客户端react代码入口，由Provider、BrowserRouter组件组成，ReactDom.hydrate方法，将生成的realDom挂在在root容器上。用于同构代码绑定事件。
2. 在Provider的store属性上，传入客服端的store，这个store通过window.context.state进行注水
3. 该同构代码会被打包成bundle.js由服务端入口内部html模版引入。当渲染完html会加载script同构代码，绑定事件


> src/store/index.js
1. 用combineReducer方法将不同页面内，reducer对action的处理合并，并用其创建store；
2. 由于node服务端执行过程中会创建store，而且会针对多个客户端，所以不能直接创建store导出，而是导出创建store的方法
3. 服务端获取store方法和客户端获取store方法不一样，服务端在接口fulfilled的时候将store注入，此时已经有数据了。而客户端需要通过script嵌入服务端state的方式将state注入store。
4. 使用了reudx-thunk的withExraArguments将request方法传入客户端和服务端的redux中去，因为在处理异步时，两者的baseURL不相同。node端请求的必须是api server的全路径，而客户端请求的是/API，再通过node的反响代理。


#### 处理css样式 3种方式
> style-load不能运行在webpack.server.js，因为没有window，只能用isomorphic-style-loader代替
1. demo推荐做法。用mini-css-extract-plugin，将css单独打包到public下，在服务端拼接html的时候，将link拼接进head标签
2. 基于第一种，在服务端对打包后的css进行readFile, 将样式直接写入head的style中去。
3. css不进行单独打包，由前端js生成到style标签中，这样有一定问题，服务端渲染没有样式，在同构阶段才有，因为同构阶段才有dom，才能操作style。
  所以在服务端渲染阶段需要将样式拿到。每个页面组件需要有componentWillMount方法，此钩子可以在服务端执行，在其中通过this.props.staticContext = styles.getCss(), 将cssStr传给服务端入口，通过StaticRouter的context可以拿到，在渲染html阶段，将其写入到head style标签中。


#### SEO优化
1. 不使用js渲染页面
2. 根据spider全文匹配(3代全文索引)关键字特征的特点。不仅仅meta keyword，html内容里要有关键文本。
3. title内容要有吸引力，有关键字，提升点击转化率。
4. 内容原创性。
5. 内部链接网页和主页内容关联度要高。对于当前目标站点的外部链接要多一些。
6. 图片等多媒体内容丰富
7. 用react-helmet，以组件形式更加方便的编写head中的title、keyword、description