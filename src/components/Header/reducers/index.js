import { combineReducers } from "redux";
import cityNameReducer from "./cityName";
import set_icon_reducer from "./icon";
import maxTempReducer from "./maxTemp";
import set_desc_reducer from "./tempDesc";

const allReducers = combineReducers({
    city_displayed: cityNameReducer,
    max_temp: maxTempReducer,
    temp_desc: set_desc_reducer,
    icon: set_icon_reducer
})

export default allReducers;