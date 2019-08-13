import axios from 'axios';
import { API_HOST } from './constants';


const WRITER_API = API_HOST;

// const axios = Axios.create()

function getJWT(username, password) {
    return axios.post(`${WRITER_API}/token-auth/`, {
        username: username,
        password: password
    });
}

export function signInPost(username, password) {
    return axios.post(`${WRITER_API}/signin/`,
        {
            username: username,
            password: password
        }
    ).then(res => {
        console.log(res.data);
        return {
            success: true,
            username: username,
            screen_name: res.data.screen_name,
            token: getJWT(username, password).token
        }
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
        return {
            success: true,
            username: username,
            screen_name: res.data.screen_name,
            token: getJWT(username, password).token
        }
    }).catch((error) => {
        return {
            message: error.response.data,
            success: false
        }
    });
};
