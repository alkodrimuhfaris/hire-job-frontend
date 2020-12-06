import http from '../../helpers/http';

export default {
  getExperience: (token) => ({
    type: 'GET_EXPRERIENCE',
    payload: http(token).get('worker/experience'),
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
