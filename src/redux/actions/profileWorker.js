import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getProfile: (token) => {
    return {
      type: 'GET_PROFILE',
      payload: http(token).get('worker/account'),
    };
  },
  addExperience: (token, data) => ({
    type: 'ADD_EXPERIENCE',
    payload: http(token).post('worker/experience', qs.stringify(data)),
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
