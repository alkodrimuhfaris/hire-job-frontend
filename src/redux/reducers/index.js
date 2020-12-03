import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
import home from './home';
import updateProfileRecruiter from './updateProfileRecruiter';
import updateCompany from './updateCompany';
import myCompany from './getCompany';

export default combineReducers({
  auth,
  register,
  message,
  profileRecruiter,
  profileWorker,
  home,
  myCompany,
  updateProfileRecruiter,
  updateCompany,
});
