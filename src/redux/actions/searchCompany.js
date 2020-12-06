import http from '../../helpers/http';
import qs from 'qs';

export default {
  search: (token, data) => ({
    type: 'SEARCH_COMPANY',
    payload: http(token).get('home?' + qs.stringify(data)),
  }),
  scrollSearch: (token, query) => ({
    type: 'SCROLL_COMPANY',
    payload: http(token).get('home?' + query),
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
