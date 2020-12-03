import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
import updateProfileRecruiter from './updateProfileRecruiter';
import updateCompany from './updateCompany';
import myCompany from './getCompany';

export default combineReducers({
  auth,
  register,
  profileRecruiter,
  profileWorker,
  myCompany,
  updateProfileRecruiter,
  updateCompany,
});
