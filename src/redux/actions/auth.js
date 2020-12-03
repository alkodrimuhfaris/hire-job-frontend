import http from '../../helpers/http';
import qs from 'querystring';

export default {
  login: (data) => ({
    type: 'LOGIN',
    payload: http().post('auth/login', qs.stringify(data)),
  }),
  registerWorker: (data) => ({
    type: 'REGISTER_WORKER',
    payload: http().post('auth/signup/2', qs.stringify(data)),
  }),
  registerRecruiter: (data) => ({
    type: 'REGISTER_RECRUITER',
    payload: http().post('auth/signup/3', qs.stringify(data)),
  }),
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
};
