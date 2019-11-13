import { ADD_ERROR } from '../costants/index';
export function addError(payload) {
    return { type: ADD_ERROR, payload };
}
