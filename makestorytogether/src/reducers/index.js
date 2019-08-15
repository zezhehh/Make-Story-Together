import { combineReducers } from 'redux';
import writers from './writers';
import groups from './groups';
import stories from './stories';

export default combineReducers({ writers, groups, stories });
