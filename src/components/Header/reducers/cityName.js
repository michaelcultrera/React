const set_city_reducer = (state = "none", action) => {
    switch(action.type) {
        case 'SET_CITY':
            return action.payload
        default:
            return state; 
    }
}

export default set_city_reducer;