import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';

export default combineReducers({
  auth,
  register,
  message,
});
