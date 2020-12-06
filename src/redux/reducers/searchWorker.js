const initialState = {
  searchResult: [],
  searchQuery: {},
  sortBy: 1,
  pageInfo: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUERY': {
      return {
        ...state,
        searchQuery: action.payload,
      };
    }
    case 'SORT_BY': {
      return {
        ...state,
        sortBy: action.payload,
      };
    }
    case 'SEARCH_WORKER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        alertMsg: 'Searching. Please wait..',
      };
    }
    case 'SEARCH_WORKER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: 'Search rejected',
      };
    }
    case 'SEARCH_WORKER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        searchResult: action.payload.data.results,
        pageInfo: action.payload.data.pageInfo[0],
        alertMsg: 'Search successfull',
      };
    }
    case 'SCROLL_WORKER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Scrolling. Please wait..',
      };
    }
    case 'SCROLL_WORKER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        alertMsg: 'Search rejected',
      };
    }
    case 'SCROLL_WORKER_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isError: false,
        isSuccess: true,
        searchResult: [...state.searchResult, ...action.payload.data.results],
        pageInfo: action.payload.data.pageInfo[0],
        alertMsg: 'Scrolling successfull',
      };
    }
    default: {
      return state;
    }
  }
};
