import { STATUS } from '../actions/writers'
import { combineReducers } from 'redux'

const initialState = {
    status: STATUS.ANONYMOUS,
    token: undefined
}

function logIn(state = initialState, action) {
    return state
}

function signUp(state = initialState, action) {
    return state
}

function logOut(state = initialState, action) {
    return state
}

export const userReducer = combineReducers({
    logIn,
    signUp,
    logOut
})

