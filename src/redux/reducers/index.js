import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
import skill from './skill';

export default combineReducers({
  auth,
  register,
  message,
  profileRecruiter,
  profileWorker,
  skill,
});
