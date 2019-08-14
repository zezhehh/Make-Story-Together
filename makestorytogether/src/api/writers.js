import axios from 'axios';
import { API_HOST } from './constants';


const WRITER_API = API_HOST;

// const axios = Axios.create()

function getJWT(username, password) {
    return axios.post(`${WRITER_API}/token-auth/`, {
        username: username,
        password: password
    }).then((res) => {
        return res.data.token
    });
}

export function signInPost(username, password) {
    return axios.post(`${WRITER_API}/signin/`,
        {
            username: username,
            password: password
        }
    ).then(res => {
        return getJWT(username, password).then((token) => {
            return {
                success: true,
                username: username,
                screen_name: res.data.screen_name,
                token
            }
        });
    }).catch((error) => {
        return {
            message: error.response.data,
            success: false
        }
    });
};

export function registerPost(screen_name, username, password) {
    return axios.post(`${WRITER_API}/register/`,
        {
            username: username,
            password: password,
            screen_name: screen_name
        }
    ).then(res => {
        return getJWT(username, password).then((token) => {
            return {
                success: true,
                username: username,
                screen_name: res.data.screen_name,
                token
            }
        });
    }).catch((error) => {
        return {
            message: error.response.data,
            success: false
        }
    });
};
