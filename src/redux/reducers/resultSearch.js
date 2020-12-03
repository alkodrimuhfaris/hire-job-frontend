const initialState = {
  searchData: [],
  searchDataIsLoading: false,
  searchDataIsError: false,
  searchDataAlertMsg: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOME_PENDING': {
      return {
        ...state,
        searchDataIsLoading: true,
      };
    }
    case 'GET_HOME_REJECTED': {
      return {
        ...state,
        searchDataIsLoading: false,
        searchDataIsError: true,
        searchDataAlertMessage: action.payload.response.data.message,
      };
    }
    case 'GET_HOME_FULFILLED': {
      return {
        ...state,
        searchDataIsLoading: false,
        searchDataIsError: false,
        searchData: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
};
