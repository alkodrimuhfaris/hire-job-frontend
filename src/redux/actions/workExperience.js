import http from '../../helpers/http';

export default {
  getWorkerExpById: (token, id) => {
    return {
      type: 'GET_EXP_DETAIL',
      payload: http(token).get('/worker/experience' + id),
    };
  },
  deleteExp: (token, id) => {
    return {
      type: 'DELETE_EXP',
      payload: http(token).delete(`worker/experience/${id}`),
    };
  },
  updateExperience: (token, id, form) => {
    return {
      type: 'UPDATE_EXPERIENCE',
      patload: http(token).patch(`worker/experience/${id}`, form),
    };
  },
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
