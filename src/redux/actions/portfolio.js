import http from '../../helpers/http';

export default {
  getPortfolioList: (token) => {
    return {
      type: 'GET_PORTFOLIO',
      payload: http(token).get('worker/portofolio'),
    };
  },
  destroy: () => ({
    type: 'DESTROY',
  }),
};
