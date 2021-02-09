import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Routes from '../Router/routes'
import { Provider } from 'react-redux'
import { getClientStore } from '../store/index'

const Root = () => {
    return (
        <Provider store={getClientStore(window.context.state)}>
            <BrowserRouter>
                <Switch>
                { Routes.map(conf => <Route {...conf} key={conf.key} />) }
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDom.hydrate(<Root />, document.getElementById('root'))