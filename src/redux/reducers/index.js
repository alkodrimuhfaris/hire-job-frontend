import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';

export default combineReducers({
  auth,
  register,
  profileRecruiter,
  profileWorker,
});
