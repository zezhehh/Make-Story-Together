export const CREATE_STORY = 'CREATE_STORY';
export const DONE_CREATE_STORY = 'DONE_CREATE_STORY';
export const QUIT_STORY = 'QUIT_STORY';
export const JOIN_STORY = 'JOIN_STORY';
export const DELETE_STORY = 'DELETE_STORY';
export const CREATE_CHARACTER = 'CREATE_CHARACTER';
export const DONE_CREATE_CHARACTER = 'DONE_CREATE_CHARACTER';


export const STATUS = {
    CREATING_STORY: 'CREATING_STORY',
    NORMAL_VIEW: 'NORMAL_VIEW'
}


export const WRITING_STATUS = {
    CREATING_CHARACTER: 'CREATING_CHARACTER',
    NORMAL_VIEW: 'NORMAL_VIEW'
}


export const createCharacter = () => ({
    type: CREATE_CHARACTER,
    payload: {

    }
});


export const doneCreateCharacter = () => ({
    type: DONE_CREATE_CHARACTER,
    payload: {
        
    }
});

export const createStory = () => ({
    type: CREATE_STORY,
    payload: {
        
    }
});

export const doneCreateStory = () => ({
    type: DONE_CREATE_STORY,
    payload: {
        
    }
})

export const quitStory = () => ({
    type: QUIT_STORY,
    payload: {

    }
});

export const joinStory = () => ({
    type: JOIN_STORY,
    payload: {

    }
})

export const deleteStory = () => ({
    type: DELETE_STORY,
    payload: {

    }
})
