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
    if (token === null) {
        return axios.get(url)
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
