const initialState = {
  portfolioData: [],
  portfolioIsLoading: false,
  portfolioIsError: false,
  portfolioAlertMsg: '',
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
    case 'DESTROY': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
