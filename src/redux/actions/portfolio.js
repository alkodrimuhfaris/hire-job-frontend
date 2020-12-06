import http from '../../helpers/http';

export default {
  getPortfolioList: (token) => {
    return {
      type: 'GET_PORTFOLIO',
      payload: http(token).get('worker/portofolio'),
    };
  },
  deletePortfolio: (token, id) => {
    return {
      type: 'DELETE_PORTFOLIO',
      payload: http(token).delete(`worker/portofolio/${id}`),
    };
  },
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
