import * as types from './actionTypes'

const defaultState = {
    homeList: []
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case types.SAVE_HOME_LIST:
            console.log(action.payload)
            return {
                ...state,
                homeList: action.payload
            }
        default:
            return state
    }
    return state;
}

export default reducer;