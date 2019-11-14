import { FETCH_DOCUMENTS, FETCH_DOCUMENTS_SUCCESS, FETCH_DOCUMENTS_ERROR } from '../costants/index';
import { reducer as notifications } from 'react-notification-system-redux';
import { combineReducers } from 'redux';
const initialState = {
    documents: [],
};
function documentsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DOCUMENTS:
            return {
                ...state,
            };
        case FETCH_DOCUMENTS_SUCCESS:
            return {
                ...state,
                documents: action.payload,
            };
        case FETCH_DOCUMENTS_ERROR:
            return {
                ...state,
                documents: action.payload,
            };
        default:
            return state;
    }
}
const rootReducer = combineReducers({ documentsReducer, notifications });
export default rootReducer;
