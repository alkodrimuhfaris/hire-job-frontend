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
  addPortofolio: (token, data) => {
    console.log(data);
    return {
      type: 'ADD_PORTOFOLIO',
      payload: http(token).post('worker/portofolio', data),
    };
  },
  addPortofolioData: (token, data) => {
    console.log(qs.stringify(data));
    return {
      type: 'ADD_PORTOFOLIO',
      payload: http(token).post('worker/portofolio', qs.stringify(data)),
    };
  },
};
