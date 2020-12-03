import http from '../../helpers/http';

export default {
  getHome: (token, search = '') => {
    return {
      type: 'GET_HOME',
      payload: http(token).get('home', {params: {search: search}}),
    };
  },
};
