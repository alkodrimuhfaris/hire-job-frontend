const initialState = {
  portfolioData: [],
  portfolioIsLoading: false,
  portfolioIsError: false,
  portfolioAlertMsg: '',

  deleteIsLoading: false,
  deleteIsError: false,
  deleteAlert: '',
  isDelete: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PORTFOLIO_PENDING': {
      return {
        ...state,
        portfolioIsLoading: true,
      };
    }
    case 'GET_PORTFOLIO_REJECTED': {
      return {
        ...state,
        portfolioIsLoading: false,
        portfolioIsError: true,
        portfolioAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_PORTFOLIO_FULFILLED': {
      return {
        ...state,
        portfolioIsLoading: false,
        portfolioIsError: false,
        portfolioData: action.payload.data.results,
      };
    }
    case 'DELETE_PORTFOLIO_PENDING': {
      return {
        ...state,
        deleteIsLoading: true,
        deleteAlert: 'Removing portfolio. Please wait..',
      };
    }
    case 'DELETE_PORTFOLIO_REJECTED': {
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsError: true,
        deleteAlert: action.payload.response.data.message,
      };
    }
    case 'DELETE_PORTFOLIO_FULFILLED': {
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsError: false,
        isDelete: true,
        deleteAlert: 'Successfully remove portfolio from list',
      };
    }
    case 'CLEAR_ALERT': {
      return {
        ...state,
        deleteIsError: false,
        isDelete: false,
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
