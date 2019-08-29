import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {userReducer} from './reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {watchLoadUserData} from './sagas';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import RepoComponent from './Repo';
import SpinnerComponent from './Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    user: userReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchLoadUserData);

const routing = (
    <Provider store={store}>
        <Router>
            <div className="App">
                <header className="App-header">
                    <Route exact path="/" component={App} />
                    <Route exact path="/Repo" component={RepoComponent} />
                    <Route exact path="/Spinner" component={SpinnerComponent} />
                </header>
            </div>
        </Router>
    </Provider>
  )

ReactDOM.render(
    routing,
    document.getElementById('root')
);
serviceWorker.unregister();
