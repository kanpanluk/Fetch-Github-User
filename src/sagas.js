import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';
const baseUrl = 'https://api.github.com/users';
const searchUrl = 'https://api.github.com/search/users?q=';
function* loadUserData(action) {
    // const user = yield axios.get(`${baseUrl}/${action.name}`);
    // const repo = yield axios.get(`${baseUrl}/${action.name}/repos`);
    // console.log(repo);
    // var data = Object.assign([], user.data, repo.data);
    const users = yield axios.get(`${searchUrl}${action.name}`);
    yield put(actions.loadUserDataSuccess(users.data))
}

export function* watchLoadUserData() {
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}
