import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
import searchCompany from './searchCompany';

export default combineReducers({
  auth,
  register,
  message,
  profileRecruiter,
  profileWorker,
  searchCompany,
});
