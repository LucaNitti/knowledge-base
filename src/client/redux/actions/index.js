import { FETCH_DOCUMENTS_SUCCESS, FETCH_DOCUMENTS_ERROR } from '../costants/index';

export function fetchDocumentsSuccess(documents) {
    return { type: FETCH_DOCUMENTS_SUCCESS, payload: documents };
}

export function fetchDocumentsError() {
    return { type: FETCH_DOCUMENTS_ERROR, payload: documents };
}
