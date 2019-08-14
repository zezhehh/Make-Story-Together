export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';

export const STATUS = {
    LOGGED_IN: 'LOGGED_IN',
    ANONYMOUS: 'ANONYMOUS'
}

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
