const initialState = {
  homeData: [],
  homeIsLoading: false,
  homeIsError: false,
  homeAlertMsg: '',
  userDetailsData: {},
  userDetailsIsLoading: false,
  userDetailsIsError: false,
  userDetailsAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOME_PENDING': {
      return {
        ...state,
        homeIsLoading: true,
      };
    }
    case 'GET_HOME_REJECTED': {
      return {
        ...state,
        homeIsLoading: false,
        homeIsError: true,
        homeAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_HOME_FULFILLED': {
      return {
        ...state,
        homeIsLoading: false,
        homeIsError: false,
        homeData: action.payload.data.results,
      };
    }
    case 'GET_DETAILS_USER_PENDING': {
      return {
        ...state,
        userDetailsIsLoading: true,
      };
    }
    case 'GET_DETAILS_USER_REJECTED': {
      return {
        ...state,
        userDetailsIsLoading: false,
        userDetailsIsError: true,
        userDetailsAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_DETAILS_USER_FULFILLED': {
      return {
        ...state,
        userDetailsIsLoading: false,
        userDetailsIsError: false,
        userDetailsData: action.payload.data.results,
      };
    }
    case 'DESTROY': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
