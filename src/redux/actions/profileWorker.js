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
  getWorkerExp: (token) => {
    return {
      type: 'GET_EXP',
      payload: http(token).get('/worker/experience'),
    };
  },
  getWorkerExpById: (token, id) => {
    return {
      type: 'GET_EXP',
      payload: http(token).get(`/worker/experience/${id}`),
    };
  },
  addPortofolio: (token, form) => {
    return {
      type: 'ADD_PORTOFOLIO',
      payload: http(token).post('worker/portofolio', form),
    };
  },
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
