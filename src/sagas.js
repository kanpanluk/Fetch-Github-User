import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';

const searchUrl = 'https://api.github.com/search/users?q=';

function* loadUserData(action) {

    const users = yield axios.get(`${searchUrl}${action.name}`);
    yield put(actions.loadUserDataSuccess(users.data))
    
}

export function* watchLoadUserData() {
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}
