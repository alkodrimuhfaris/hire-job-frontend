import http from '../../helpers/http';

export default {
  getHome: (token) => {
    return {
      type: 'GET_HOME',
      payload: http(token).get('home?limit=30'),
    };
  },

  getDetailsUser: (token, id) => {
    return {
      type: 'GET_DETAILS_USER',
      payload: http(token).get(`/home/${id}`),
    };
  },

  destroy: () => ({
    type: 'DESTROY',
  }),
};
