export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';
export const RETRIEVE_INFO = 'RETRIEVE_INFO';

export const STATUS = {
    LOGGED_IN: 'LOGGED_IN',
    ANONYMOUS: 'ANONYMOUS'
}

export const retrieveInfo = (info) => ({
    type: RETRIEVE_INFO,
    payload: {
        ...info
    }
})

export const logIn = (username, screen_name, token) => ({
    type: LOG_IN,
    payload: {
        username,
        screen_name,
        token
    }
});

export const signUp = (username, screen_name, token) => ({
    type: SIGN_UP,
    payload: {
        username,
        screen_name,
        token
    }
});

export const logOut = () => ({
    type: LOG_OUT
});
