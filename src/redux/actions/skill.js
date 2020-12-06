import http from '../../helpers/http';
import qs from 'querystring';

export default {
  getSkill: (token, search = '') => {
    return {
      type: 'GET_SKILL',
      payload: http(token).get(`/worker/skill/?search=${search}`),
    };
  },

  postSkill: (token, data) => {
    return {
      type: 'POST_SKILL',
      payload: http(token).post('/worker/list/skill', qs.stringify(data)),
    };
  },

  listSkill: (token) => {
    return {
      type: 'LIST_SKILL',
      payload: http(token).get('/worker/list/skill'),
    };
  },

  deleteWorkerSkill: (token, id) => {
    return {
      type: 'DELETE_SKILL',
      payload: http(token).delete('/worker/delete/skill/' + id),
    };
  },
};
