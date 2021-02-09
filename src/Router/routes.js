import React from 'react'
import Login from '../client/pages/login/index.jsx'
import Dashboard from '../client/pages/dashboard/index.jsx'
import Home from '../client/pages/home/index.jsx'
import NotFound from '../client/pages/notFound/index.jsx'
export default [
    {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: '/'
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        key: 'login'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        exact: true,
        key: 'dashboard'
    },
    {
        component: NotFound,
        key: 'notFound'
    }
]
