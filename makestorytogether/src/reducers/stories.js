import { CREATE_STORY, DONE_CREATE_STORY, STATUS } from '../actions/stories';

const initialState = {
    status: STATUS.NORMAL_VIEW
}

function createStory(state, action) {
    switch (state.status) {
        case STATUS.NORMAL_VIEW: {
            return {
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
        default:
            return state
    }
}


