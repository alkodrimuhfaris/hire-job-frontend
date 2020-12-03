import services from '../../helpers/http';
import qs from 'qs';

export default {
  getProfile: (token, id) => ({
    type: 'GET_USER',
    payload: services(token).get('home/' + id),
  }),
  getAllList: (token) => ({
    type: 'GET_LIST',
    payload: services(token).get('message/list/person'),
  }),
  getPrivate: (token, id) => ({
    type: 'GET_PRIVATE',
    payload: services(token).get('message/list/chat/' + id),
  }),
  privateScroll: (token, id, page) => ({
    type: 'PRIVATE_SCROLL',
    payload: services(token).get(
      'message/list/chat/' + id + '?' + qs.stringify({page}),
    ),
  }),
  allListScroll: (token, page) => ({
    type: 'LIST_SCROLL',
    payload: services(token).get('message/list/person?' + qs.stringify({page})),
  }),
  sendChat: (token, id, message) => ({
    type: 'SEND_CHAT',
    payload: services(token).post(
      'message/chat/' + id,
      qs.stringify({message}),
    ),
  }),
  readChat: (token, id) => ({
    type: 'READ_CHAT',
    payload: services(token).patch('message/read/' + id),
  }),
  destroy: () => ({
    type: 'DESTROY',
  }),
};
