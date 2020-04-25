import { createStore, combineReducers } from 'redux';
import prueba from './reducer';
import loginReducer from './isLogginReducer';

const reducers = combineReducers({
    count: prueba,
    loggin: loginReducer,
});

const store = createStore(
    reducers
);

export default store;

