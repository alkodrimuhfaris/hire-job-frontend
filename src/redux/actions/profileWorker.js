import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getProfile: (token) => {
    return {
      type: 'GET_PROFILE',
      payload: http(token).get('worker/account'),
    };
  },

  updateProfile: (token, data) => {
    return {
      type: 'UPDATE_PROFILE',
      payload: http(token).patch('worker/account', qs.stringify(data)),
    };
  },

  updateImageProfile: (token, data) => {
    return {
      type: 'UPDATE_PROFILE',
      payload: http(token).patch('worker/account', data),
    };
  },
};
