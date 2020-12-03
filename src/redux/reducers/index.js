import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
import searchCompany from './searchCompany';
import searchWorker from './searchWorker';
import home from './home';
import portfolio from './portfolio';

export default combineReducers({
  auth,
  register,
  message,
  profileRecruiter,
  profileWorker,
  searchCompany,
  searchWorker,
  home,
  portfolio,
});
