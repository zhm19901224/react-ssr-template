import axios from 'axios'
import * as types from './actionTypes'
const createSaveHomeListAction = (list) => ({ type: types.SAVE_HOME_LIST, payload: list })

export const getHomeList = (isServer) => {
    return (dispactch, getState, request) => {
        return request('/api/news.json', 'get', { secret: 'PP87ANTIPIRATE'}).then((res) => {
            dispactch(createSaveHomeListAction(res.data.data))
        })
    } 
}


