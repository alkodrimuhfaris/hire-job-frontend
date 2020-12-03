const initialState = {
  homeData: [],
  homeIsLoading: false,
  homeIsError: false,
  homeAlertMsg: '',
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
    default: {
      return state;
    }
  }
};
