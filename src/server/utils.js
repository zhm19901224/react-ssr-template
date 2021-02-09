import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

export const render = (store, routes, req) => {
    // 需要将store的state数据给前端，前端在执行同构时，初始化store直接用现成数据
    const content = renderToString((
        <Provider store={store}>
            <StaticRouter context={{}} location={req.path}>
                <Switch>
                { routes.map(conf => <Route {...conf} key={conf.key} />) }
                </Switch>
            </StaticRouter>
        </Provider>
    ))

    return `
        <html>
            <head>
                <title>ssr page</title>
                <link rel="stylesheet" href="./main.css">
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.context = {
                        state: ${JSON.stringify(store.getState())}
                    }
                </script>
                <script src='./index.js'></script>
            </body>
        </html>
    `;
}