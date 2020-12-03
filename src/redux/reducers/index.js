import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
import searchCompany from './searchCompany';
import searchWorker from './searchWorker';
import skill from './skill';
import home from './home';
import portfolio from './portfolio';
import updateProfileRecruiter from './updateProfileRecruiter';
import updateCompany from './updateCompany';
import myCompany from './getCompany';

export default combineReducers({
  auth,
  register,
  message,
  profileRecruiter,
  profileWorker,
  searchCompany,
  searchWorker,
  skill,
  home,
  portfolio,
  myCompany,
  updateProfileRecruiter,
  updateCompany,
});
