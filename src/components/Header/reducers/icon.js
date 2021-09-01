const set_icon_reducer = (state = "none", action) => {
    switch(action.type){
        case 'SET_ICON':
            return action.payload
        default: 
            return state 
    }
}

export default set_icon_reducer;