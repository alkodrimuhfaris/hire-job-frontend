import services from '../../helpers/services';
import qs from 'qs';

export default {
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
  sendChat: (token, id, chat) => ({
    type: 'SEND_CHAT',
    payload: services(token).post('message/chat/' + id, qs.stringify({chat})),
  }),
  readChat: (token, id) => ({
    type: 'READ_CHAT',
    payload: services(token).patch('message/read/' + id),
  }),
};
