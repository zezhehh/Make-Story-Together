import axios from 'axios';
import { API_HOST } from './constants';


const STORY_API = `${API_HOST}/story`;
const GROUP_API = `${API_HOST}/group`;
// const DISCIPLINE_API = `${API_HOST}/discipline`;
const TAG_API = `${API_HOST}/tag`;

function getURL(itemType) {
    let API_URL;
    switch (itemType) {
        case 'group':
            API_URL = GROUP_API;
            break;
        case 'story':
            API_URL = STORY_API;
            break;
        // case 'discipline':
        //     API_URL = DISCIPLINE_API;
        //     break;
        case 'tag':
            API_URL = TAG_API;
            break;
        default:
            API_URL = GROUP_API;
    }
    return API_URL;
}

export function fetchItemList(itemType='group', orderBy='date', groupID='') {
    const API_URL = getURL(itemType);
    return axios.get(`${API_URL}/?order=${orderBy}&group=${groupID}`)
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

export function fetchOwnedItems(token, itemType='group') {
    const API_URL = getURL(itemType);
    return axios.get(`${API_URL}/my/`,
        {
            'headers': {
                Authorization: `JWT ${token}`
            }
        })
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

export function fetchJoinedItems(token, itemType='group') {
    const API_URL = getURL(itemType);
    return axios.get(`${API_URL}/joined/`,
        {
            'headers': {
                Authorization: `JWT ${token}`
            }
        })
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

export function fetchItemDetail(itemID, itemType='group', token=null) {
    const API_URL = getURL(itemType);
    if (token !== null) {
        return axios.get(`${API_URL}/${itemID}/`,
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
    } else {
        return axios.get(`${API_URL}/${itemID}/`)
            .then((res) => res.data)
            .catch((error) => {
            return {
                message: error.response.data,
                success: false
            }
        });
    }
}

export function createItem(token, itemInfo, itemType='group') {
    const API_URL = getURL(itemType);
    return axios.post(`${API_URL}/`,
        {
            ...itemInfo
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

export function deleteItem(token, itemID, itemType='group') {
    const API_URL = getURL(itemType);
    return axios.delete(`${API_URL}/${itemID}/`,
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

export function patchItem(token, itemID, patchContent, itemType='group') {
    const API_URL = getURL(itemType);
    return axios.patch(`${API_URL}/${itemID}/`,
    {
        ...patchContent
    },
    {
        'headers': {
            Authorization: `JWT ${token}`
        }
    })
    .then((res) => res.data)
    .catch((error) => {
        console.log('patch error')
    })
}
