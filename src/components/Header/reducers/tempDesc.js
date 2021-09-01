const set_desc_reducer = (state = "none", action) => {
    switch(action.type) {
        case 'SET_DESC':
            return action.payload
        default:
            return state; 
    }
}

export default set_desc_reducer;