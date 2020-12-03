import http from '../../helpers/http';

export default {
  getHome: (token) => {
    return {
      type: 'GET_HOME',
      payload: http(token).get('home?limit=30'),
    };
  },
  destroy: () => ({
    type: 'DESTROY',
  }),
};
