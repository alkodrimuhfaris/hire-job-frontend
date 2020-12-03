const initialState = {
  companyData: [],
  companyIsLoading: false,
  companyIsError: false,
  companyAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MY_COMPANY_PENDING': {
      return {
        ...state,
        companyIsLoading: true,
      };
    }
    case 'GET_MY_COMPANY_REJECTED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: true,
        companyAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_MY_COMPANY_FULFILLED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: false,
        companyData: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
};
