import http from '../../helpers/http';
import qs from 'qs';

export default {
  search: (token, search) => ({
    type: 'SEARCH_COMPANY',
    payload: http(token).get(
      'home?' + qs.stringify({search: {company: search}}),
    ),
  }),
  scrollSearch: (token, search, page) => ({
    type: 'SCROLL_COMPANY',
    payload: http(token).get(
      'home?' + qs.stringify({search: {company: search}, page}),
    ),
  }),
  sortBy: (sortBy) => ({
    type: 'SORT_BY',
    payload: sortBy,
  }),
  addSearch: (search) => ({
    type: 'ADD_QUERY',
    payload: search,
  }),
};
