import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getProfile: (token) => {
    return {
      type: 'GET_PROFILE',
      payload: http(token).get('recruiter/account'),
    };
  },
  updateProfile: (token, data) => {
    return {
      type: 'UPDATE_PROFILE',
      payload: http(token).patch('recruiter/account', qs.stringify(data)),
    };
  },
  updatePhotoRecruiter: (token, data) => {
    return {
      type: 'UPDATE_PROFILE',
      payload: http(token).patch('recruiter/account', data),
    };
  },
  // COMPANY
  getMyCompany: (token) => {
    return {
      type: 'GET_MY_COMPANY',
      payload: http(token).get('recruiter/company/self'),
    };
  },
  updateCompany: (token, data) => {
    return {
      type: 'UPDATE_COMPANY',
      payload: http(token).patch('recruiter/company', qs.stringify(data)),
    };
  },
  updatePhotoCompany: (token, data) => {
    return {
      type: 'UPDATE_COMPANY',
      payload: http(token).patch('recruiter/company', data),
    };
  },
};
