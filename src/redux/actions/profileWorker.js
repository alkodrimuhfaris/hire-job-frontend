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

  addExperience: (token, data) => ({
    type: 'ADD_EXPERIENCE',
    payload: http(token).post('worker/experience', qs.stringify(data)),
  }),
  addPortofolio: (token, data) => {
    return {
      type: 'ADD_PORTOFOLIO',
      payload: http(token).post('worker/portofolio', data),
    };
  },
  addPortofolioData: (token, data) => {
    console.log(data._parts[0][1]);
    return {
      type: 'ADD_PORTOFOLIO',
      payload: http(token).post('worker/portofolio', data._parts[0][1]),
    };
  },
  destroy: () => ({
    type: 'DESTROY',
  }),
};
