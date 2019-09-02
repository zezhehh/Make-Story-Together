import axios from 'axios';
import { API_HOST } from '../constants';
import { postURLWithContent, getURL } from './common';

const STORY_API = `${API_HOST}/story`;
const TAG_API = `${API_HOST}/tag`

export function searchTagByName(name) {
    return axios.get(`${TAG_API}/?name=${name}`)
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log('search fail')
    })
}

export function searchByTitle(title) {
    return axios.get(`${STORY_API}/?title=${title}`)
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log('search fail')
    })
}

export function joinStory(token, storyID) {
    return axios.post(`${STORY_API}/${storyID}/join/`, {},
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

export function quitStory(token, storyID) {
    return axios.post(`${STORY_API}/${storyID}/quit/`, {},
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

export function removeMembers(token, storyID, members) {
    return axios.post(`${STORY_API}/${storyID}/remove_members/`, {
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

export function removeDiscipline(token, storyID, disciplineId) {
    return axios.post(`${STORY_API}/${storyID}/remove_discipline/`, {
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

export function applyDiscipline(token, storyID, disciplineId) {
    return axios.post(`${STORY_API}/${storyID}/apply_discipline/`, {
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

export function removeTag(token, storyID, tagId) {
    return axios.post(`${STORY_API}/${storyID}/remove_tag/`, {
        tag_id: tagId
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

export function applyTag(token, storyID, tagId) {
    return axios.post(`${STORY_API}/${storyID}/apply_tag/`, {
        tag_id: tagId
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


export function newChapter(token, storyID, postContent) {
    return postURLWithContent(
        token, 
        `${STORY_API}/${storyID}/new_chapter/`, 
        postContent
    )
}


export function newPlot(token, storyID, postContent) {
    return postURLWithContent(
        token, 
        `${STORY_API}/${storyID}/new_plot/`, 
        postContent
    )
}


export function getChapters(token, storyID) {
    return getURL(token, `${STORY_API}/${storyID}/chapters/`)
}

export function getPlots(token, storyID, chapterID) {
    return getURL(token, `${STORY_API}/${storyID}/plots/?chapter_id=${chapterID}`)
}

export function getCharacters(token, storyID) {
    return getURL(token, `${STORY_API}/${storyID}/get_characters/`)
}

export function removeInvalidPlots(token, storyID) {
    return postURLWithContent(
        token,
        `${STORY_API}/${storyID}/remove_invalid_plots/`
    )
}

export function clearEmptyContent(token, storyID) {
    return postURLWithContent(
        token,
        `${STORY_API}/${storyID}/clear_empty_content/`
    )
}
