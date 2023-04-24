import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist'
import Authslice from './Authslice';
import Jobslice from './jobslice';
import Apliedslice from './apliedslice';

const rootreducer = combineReducers({
    Auth:Authslice.reducer,
    Job :Jobslice.reducer,
    Aplied:Apliedslice.reducer
})
const persistConfig = {
    key : 'root',
    version : 1,
    storage,
    whitelist: ['Auth'], 
}
const persistedreducer = persistReducer(persistConfig,rootreducer)

const store = configureStore({
    reducer : persistedreducer
})
export default store;