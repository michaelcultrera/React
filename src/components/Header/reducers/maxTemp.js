const set_max_temp_reducer = (state = "none", action) => {
    switch(action.type) {
        case 'SET_MAX_TEMP':
            return action.payload
        default:
            return state; 
    }
}

export default set_max_temp_reducer;