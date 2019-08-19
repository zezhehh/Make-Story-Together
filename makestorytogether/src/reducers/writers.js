import { LOG_IN, LOG_OUT, SIGN_UP, STATUS, RETRIEVE_INFO } from '../actions/writers';

const initialState = {
    status: STATUS.ANONYMOUS,
    username: undefined,
    screen_name: 'Anonymous',
    token: null
}

function retrieveInfo(state, action) {
    switch (state.status) {
        case STATUS.ANONYMOUS: {
            if (action.payload.token === null)
                return state;
            return {
                status: STATUS.LOGGED_IN,
                ...action.payload
            }
        }
        case STATUS.LOGGED_IN: {
            return state
        }
        default:
            return state;
    }
}

function logIn(state, action) {
    switch (state.status) {
        case STATUS.ANONYMOUS: {
            console.log('log in successfully');
            return {
                status: STATUS.LOGGED_IN,
                screen_name: action.payload.screen_name,
                username: action.payload.username,
                token: action.payload.token
            };
        }
        case STATUS.LOGGED_IN: {
            console.log('already logged in');
            return state;
        }
        default:
            return state;
    }
}

function signUp(state, action) {
    switch (state.status) {
        case STATUS.ANONYMOUS: {
            console.log('sign up & log in successfully');
            return {
                status: STATUS.LOGGED_IN,
                screen_name: action.payload.screen_name,
                username: action.payload.username,
                token: action.payload.token
            };
        }
        case STATUS.LOGGED_IN: {
            console.log('log out first');
            return state;
        }
        default:
            return state;
    }
}

function logOut(state, action) {
    switch (state.status) {
        case STATUS.ANONYMOUS: {
            console.log('not log in ');
            return state;
        }
        case STATUS.LOGGED_IN: {
            console.log('log out successfully');
            return {
                ...state,
                status: STATUS.ANONYMOUS
            };
        }
        default:
            return state;
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOG_IN: {
            return logIn(state, action)
        }
        case LOG_OUT: {
            return logOut(state, action)
        }
        case SIGN_UP: {
            return signUp(state, action)
        }
        case RETRIEVE_INFO: {
            return retrieveInfo(state, action)
        }
        default:
            return state
    }
}


