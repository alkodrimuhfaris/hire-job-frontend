import http from '../../helpers/http';
import qs from 'querystring';

const registerWorker = (phone) => ({
  type: 'REGISTER_WORKER',
  payload: http().post('auth/signup/2', qs.stringify({phone})),
});

export {registerWorker};
