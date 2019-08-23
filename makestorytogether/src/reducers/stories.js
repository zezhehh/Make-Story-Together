import { CREATE_STORY, DONE_CREATE_STORY, STATUS } from '../actions/stories';
import { CREATE_CHARACTER, DONE_CREATE_CHARACTER, WRITING_STATUS } from '../actions/stories';

const initialState = {
    status: STATUS.NORMAL_VIEW,
    writing_status: WRITING_STATUS.NORMAL_VIEW,
}

function createCharacter(state, aciton) {
    switch (state.writing_status) {
        case WRITING_STATUS.NORMAL_VIEW: {
            return {
                status: state.status,
                writing_status: WRITING_STATUS.CREATING_CHARACTER
            };
        }
        case WRITING_STATUS.CREATING_CHARACTER: {
            console.log('creating');
            return state;
        }
        default:
            return state;
    }
}


function doneCreateCharacter(state, action) {
    console.log('done create')
    switch (state.writing_status) {
        case WRITING_STATUS.NORMAL_VIEW: {
            console.log('no creating status')
            return state;
        }
        case WRITING_STATUS.CREATING_CHARACTER: {
            return {
                status: state.status,
                writing_status: WRITING_STATUS.NORMAL_VIEW
            };
        }
        default:
            return state;
    }
}

function createStory(state, action) {
    switch (state.status) {
        case STATUS.NORMAL_VIEW: {
            return {
                writing_status: state.writing_status,
                status: STATUS.CREATING_STORY
            };
        }
        case STATUS.CREATING_STORY: {
            console.log('creating');
            return state;
        }
        default:
            return state;
    }
}

function doneCreateStory(state, action) {
    console.log('done create')
    switch (state.status) {
        case STATUS.NORMAL_VIEW: {
            console.log('no creating status')
            return state;
        }
        case STATUS.CREATING_STORY: {
            return {
                writing_status: state.writing_status,
                status: STATUS.NORMAL_VIEW
            };
        }
        default:
            return state;
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_STORY: {
            return createStory(state, action)
        }
        case DONE_CREATE_STORY: {
            return doneCreateStory(state, action)
        }
        case CREATE_CHARACTER: {
            return createCharacter(state, action)
        }
        case DONE_CREATE_CHARACTER: {
            return doneCreateCharacter(state, action)
        }
        default:
            return state
    }
}


