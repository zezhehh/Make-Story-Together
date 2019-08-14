import axios from 'axios';
import { API_HOST } from './constants';


const GROUP_API = `${API_HOST}/group`;

export function fetchGroupList() {
    return axios.get(`${GROUP_API}/`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return {
                message: error.response.data,
                success: false
            }
        });
};

export function fetchGroupDetail(groupID) {
    return axios.get(`${GROUP_API}/${groupID}/`)
        .then((res) => res.data)
        .catch((error) => {
        return {
            message: error.response.data,
            success: false
        }
    });
}

export function createGroup(token, groupInfo) {
    return axios.post(`${GROUP_API}/`,
        {
            ...groupInfo
        },
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

export function dismissGroup(token, groupID) {
    return axios.delete(`${GROUP_API}/${groupID}/`,
        {
            'headers': {
                Authorization: `JWT ${token}`
            }
        })
        .then((res) => res.data)
        .catch((error) => {
        return {
            message: error.response.data,
            success: false
        }
    });
};
