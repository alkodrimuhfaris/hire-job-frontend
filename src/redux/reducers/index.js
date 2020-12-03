import {combineReducers} from 'redux';

import auth from './auth';
import register from './register';
import message from './message';
import profileRecruiter from './profileRecruiter';
import profileWorker from './profileWorker';
<<<<<<< HEAD
import resultSearch from './resultSearch';
=======
import home from './home';

>>>>>>> 7226fac48b0b9dae129f383068fca966cbf766ed
export default combineReducers({
  auth,
  register,
  message,
  profileRecruiter,
  profileWorker,
<<<<<<< HEAD
  resultSearch,
=======
  home,
>>>>>>> 7226fac48b0b9dae129f383068fca966cbf766ed
});
