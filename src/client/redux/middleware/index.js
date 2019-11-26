import { fetchDocumentsSuccess } from '../actions';
import { error } from 'react-notification-system-redux';
import axios from 'axios';

export const fetchDocumentsAction = parameter => {
    let { search } = parameter;
    let url = search ? `/api/document/search/${search}` : '/api/document/';
    return dispatch =>
        axios
            .get(url)
            .then(res => {
                dispatch(fetchDocumentsSuccess(res.data.documents));
            })
            .catch(err => dispatch(error({ message: 'Unable to get list of Documents', level: 'error' })));
};
