import http from '../../helpers/http';

export default {
  getDetailExperience: (token, id) => {
    return {
      type: 'GET_EXPERIENCE_DETAIL',
      payload: http(token).get(`worker/experience/${id}`),
    };
  },
  updateExperience: (token, id, form) => {
    return {
      type: 'UPDATE_EXPERIENCE',
      patload: http(token).patch(`worker/experience/${id}`, form),
    };
  },
  destroy: () => ({
    type: 'DESTROY',
  }),
};
