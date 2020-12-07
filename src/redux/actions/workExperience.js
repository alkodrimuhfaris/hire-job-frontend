import http from '../../helpers/http';
import qs from 'qs';

export default {
  getWorkerExpById: (token, id) => {
    return {
      type: 'GET_EXP_DETAIL',
      payload: http(token).get('/worker/experience/' + id),
    };
  },
  deleteExp: (token, id) => {
    return {
      type: 'DELETE_EXP',
      payload: http(token).delete(`worker/experience/${id}`),
    };
  },
  updateExperience: (token, id, data) => {
    return {
      type: 'UPDATE_EXPERIENCE',
      payload: http(token).patch(`worker/experience/${id}`, qs.stringify(data)),
    };
  },
  clearAlert: () => ({
    type: 'CLEAR_ALERT',
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
