import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';
const baseUrl = 'https://api.github.com/users';

function* loadUserData(action) {
    const user = yield axios.get(`${baseUrl}/${action.name}`);
    const repo = yield axios.get(`${baseUrl}/${action.name}/repos`);
    console.log(repo);
    var data = Object.assign([], user.data, repo.data);
    yield put(actions.loadUserDataSuccess(data))
}

export function* watchLoadUserData() {
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}
