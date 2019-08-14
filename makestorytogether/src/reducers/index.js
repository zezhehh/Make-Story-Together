import { combineReducers } from 'redux';
import writers from './writers';
import groups from './groups';

export default combineReducers({ writers, groups });
