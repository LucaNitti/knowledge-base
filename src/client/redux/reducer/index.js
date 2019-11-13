import { ADD_ERROR } from '../costants/index';
const initialState = {
    errors: [],
};
function rootReducer(state = initialState, action) {
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
export default rootReducer;
