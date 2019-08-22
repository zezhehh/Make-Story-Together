import axios from 'axios';

export function postURLWithContent(token, url, postContent={}) {
    return axios.post(url, {
        ...postContent
    },
    {
        'headers': {
            Authorization: `JWT ${token}`
        }
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log(error)
        return {
            success: false
        }
    })
}

export function getURL(token, url) {
    return axios.get(url,
    {
        'headers': {
            Authorization: `JWT ${token}`
        }
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log(error)
        return {
            success: false
        }
    })
}
