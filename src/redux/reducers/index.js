import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import profileRecruiter from './profileRecruiter';

export default combineReducers({
  auth,
  register,
  profileRecruiter,
});
