export const CREATE_GROUP = 'CREATE_GROUP';
export const DONE_CREATE_GROUP = 'DONE_CREATE_GROUP';
export const QUIT_GROUP = 'QUIT_GROUP';
export const JOIN_GROUP = 'JOIN_GROUP';
export const DISMISS_GROUP = 'DISMISS_GROUP';

export const STATUS = {
    CREATING_GROUP: 'CREATING_GROUP',
    NORMAL_VIEW: 'NORMAL_VIEW'
}

export const createGroup = () => ({
    type: CREATE_GROUP,
    payload: {
        
    }
});

export const doneCreateGroup = () => ({
    type: DONE_CREATE_GROUP,
    payload: {
        
    }
})

export const quitGroup = () => ({
    type: QUIT_GROUP,
    payload: {

    }
});

export const joinGroup = () => ({
    type: JOIN_GROUP,
    payload: {

    }
})

export const dismissGroup = () => ({
    type: DISMISS_GROUP,
    payload: {

    }
})
