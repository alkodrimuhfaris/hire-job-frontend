const initialState = {
  portfolioData: [],
  portfolioIsLoading: false,
  portfolioIsError: false,
  portfolioAlertMsg: '',

  deleteIsLoading: false,
  deleteIsError: false,
  deleteAlert: '',
  isDelete: false,

  portfolioDetailData: {},
  portfolioDetailIsLoading: false,
  portfolioDetailIsError: false,
  portfolioDetailAlertMsg: '',

  editIsLoading: false,
  editIsError: false,
  editAlert: '',
  isEdit: false,
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
    case 'GET_PORTFOLIO_DETAIL_PENDING': {
      return {
        ...state,
        portfolioDetailIsLoading: true,
      };
    }
    case 'GET_PORTFOLIO_DETAIL_REJECTED': {
      return {
        ...state,
        portfolioDetailIsLoading: false,
        portfolioDetailIsError: true,
        portfolioDetailAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_PORTFOLIO_DETAIL_FULFILLED': {
      return {
        ...state,
        portfolioDetailIsLoading: false,
        portfolioDetailIsError: false,
        portfolioDetailData: action.payload.data.results,
      };
    }
    case 'UPDATE_PORTFOLIO_PENDING': {
      return {
        ...state,
        editIsLoading: true,
        editAlert: 'Edit portfolio in progress. Please wait..',
      };
    }
    case 'UPDATE_PORTFOLIO_REJECTED': {
      return {
        ...state,
        editIsLoading: false,
        editIsError: true,
        editAlert: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PORTFOLIO_FULFILLED': {
      return {
        ...state,
        editIsLoading: false,
        editIsError: false,
        isEdit: true,
        editAlert: 'Successfully edit portfolio',
      };
    }
    case 'CLEAR_ALERT': {
      return {
        ...state,
        deleteIsError: false,
        isDelete: false,
        portfolioDetailData: {},
        editIsError: false,
        isEdit: false,
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
