import http from '../../helpers/http';

export default {
  getPortfolioList: (token) => {
    return {
      type: 'GET_PORTFOLIO',
      payload: http(token).get('worker/portofolio'),
    };
  },
  getPortfolioDetail: (token, id) => {
    return {
      type: 'GET_PORTFOLIO_DETAIL',
      payload: http(token).get(`worker/portofolio/${id}`),
    };
  },
  deletePortfolio: (token, id) => {
    return {
      type: 'DELETE_PORTFOLIO',
      payload: http(token).delete(`worker/portofolio/${id}`),
    };
  },
  updatePortfolio: (token, id, form) => {
    return {
      type: 'UPDATE_PORTFOLIO',
      payload: http(token).patch(`worker/portofolio/${id}`, form),
    };
  },
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
