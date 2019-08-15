import { CREATE_GROUP, DONE_CREATE_GROUP, STATUS } from '../actions/groups';

const initialState = {
    status: STATUS.NORMAL_VIEW
}

function createGroup(state, action) {
    switch (state.status) {
        case STATUS.NORMAL_VIEW: {
            return {
                status: STATUS.CREATING_GROUP
            };
        }
        case STATUS.CREATING_GROUP: {
            console.log('creating');
            return state;
        }
        default:
            return state;
    }
}

function doneCreateGroup(state, action) {
    console.log('done create')
    switch (state.status) {
        case STATUS.NORMAL_VIEW: {
            console.log('no creating status')
            return state;
        }
        case STATUS.CREATING_GROUP: {
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
        case CREATE_GROUP: {
            return createGroup(state, action)
        }
        case DONE_CREATE_GROUP: {
            return doneCreateGroup(state, action)
        }
        default:
            return state
    }
}


