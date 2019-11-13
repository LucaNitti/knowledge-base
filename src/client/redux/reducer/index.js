import { ADD_ERROR } from '../costants/index';
import { reducer as notifications } from 'react-notification-system-redux';
import { combineReducers } from 'redux';
const initialState = {
    errors: [],
};
function myReducer(state = initialState, action) {
    if (action.type === ADD_ERROR) {
        return {
            ...state,
            ...{
                errors: state.errors.concat(action.payload),
            },
        };
    }
    return state;
}
console.log(myReducer, notifications);
const rootReducer = combineReducers({ myReducer, notifications });
export default rootReducer;
