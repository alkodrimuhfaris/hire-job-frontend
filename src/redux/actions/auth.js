import http from '../../helpers/http';
import qs from 'querystring';

export default {
  login: (data) => ({
    type: 'LOGIN',
    payload: http().post('auth/login', qs.stringify(data)),
  }),
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  logout: () => ({
    type: 'LOGOUT',
  }),
};
