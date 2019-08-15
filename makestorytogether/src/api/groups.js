import axios from 'axios';
import { API_HOST } from './constants';


const GROUP_API = `${API_HOST}/group`;

export function joinGroup(token, groupID) {
    return axios.post(`${GROUP_API}/${groupID}/join/`, {},
        {
            'headers': {
                Authorization: `JWT ${token}`
            }
        })
        .then((res) => {
            return {
                success: true,
                ...res.data
            }
        })
        .catch((error) => {
            return {
                message: error.response.data,
                success: false
            }
        });
};

export function quitGroup(token, groupID) {
    return axios.post(`${GROUP_API}/${groupID}/quit/`, {},
        {
            'headers': {
                Authorization: `JWT ${token}`
            }
        })
        .then((res) => {
            return {
                success: true,
                ...res.data
            }
        })
        .catch((error) => {
            return {
                message: error.response.data,
                success: false
            }
        });
};

