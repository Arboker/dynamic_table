import { combineReducers } from "redux";
import selectReducer from './selectReducer'
import coefficientReducer from './coefficientReducer'

export const rootReducer = combineReducers({
    selectReducer,
    coefficientReducer
});
