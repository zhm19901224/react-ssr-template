import { createStore, combineReducers, applyMiddleware } from 'redux'
import homeReducer from '../client/pages/home/store/reducer'
import thunk from 'redux-thunk'
import getRequest from '../client/utils/request'

const reducer = combineReducers({
    home: homeReducer,   // home是该页面的命名空间
})

const serverRequest = getRequest(true)

const clientRequest = getRequest(false)

export const getStore = () => createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverRequest)));

export const getClientStore = (defaultState) => createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientRequest)));