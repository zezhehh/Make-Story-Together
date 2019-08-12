const LOG_IN = 'LOG_IN';
const SIGN_UP = 'SIGN_UP';
const LOG_OUT = 'LOG_OUT';

export const STATUS = {
    LOGGED_IN: 'LOGGED_IN',
    ANONYMOUS: 'ANONYMOUS'
}

export function logIn(username, password) {
    return {
        type: LOG_IN,
        username: username,
        password: password
    }
}

export function signUp(username, password) {
    return {
        type: SIGN_UP,
        username: username,
        password: password
    }
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}
