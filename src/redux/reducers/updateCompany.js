const initialState = {
  companyData: [],
  companyIsLoading: false,
  companyIsError: false,
  companyAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COMPANY_PENDING': {
      return {
        ...state,
        companyIsLoading: true,
      };
    }
    case 'UPDATE_COMPANY_REJECTED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: true,
        companyAlertMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_COMPANY_FULFILLED': {
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
