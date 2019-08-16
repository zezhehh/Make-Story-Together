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

export function removeMembers(token, groupID, members) {
    return axios.post(`${GROUP_API}/${groupID}/remove_members/`, {
        usernames: members
    },
    {
        'headers': {
            Authorization: `JWT ${token}`
        }
    })
    .then((res) => {
        return {
            success: true
        }
    })
    .catch((error) => {
        return {
            success: false
        }
    })
}

export function removeDiscipline(token, groupID, disciplineId) {
    return axios.post(`${GROUP_API}/${groupID}/remove_discipline/`, {
        discipline_id: disciplineId
    },
    {
        'headers': {
            Authorization: `JWT ${token}`
        }
    })
    .then((res) => {
        return {
            success: true
        }
    })
    .catch((error) => {
        return {
            success: false
        }
    })
}

export function applyDiscipline(token, groupID, disciplineId) {
    return axios.post(`${GROUP_API}/${groupID}/apply_discipline/`, {
        discipline_id: disciplineId
    },
    {
        'headers': {
            Authorization: `JWT ${token}`
        }
    })
    .then((res) => {
        return {
            success: true
        }
    })
    .catch((error) => {
        return {
            success: false
        }
    })
}
