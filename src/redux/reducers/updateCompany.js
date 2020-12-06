const initialState = {
  companyData: [],
  companyIsLoading: false,
  companyIsError: false,
  companyUpdateSuccess: false,
  companyAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COMPANY_PENDING': {
      return {
        ...state,
        companyIsLoading: true,
        companyUpdateSuccess: false,
      };
    }
    case 'UPDATE_COMPANY_REJECTED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: true,
        companyAlertMsg: action.payload.response.data.message,
        companyUpdateSuccess: false,
      };
    }
    case 'UPDATE_COMPANY_FULFILLED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: false,
        companyData: action.payload.data.results,
        companyUpdateSuccess: true,
      };
    }
    case 'UPDATE_PHOTO_COMPANY_PENDING': {
      return {
        ...state,
        companyIsLoading: true,
      };
    }
    case 'UPDATE_PHOTO_COMPANY_REJECTED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: true,
        companyAlertMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PHOTO_COMPANY_FULFILLED': {
      return {
        ...state,
        companyIsLoading: false,
        companyIsError: false,
        companyData: action.payload.data.results,
      };
    }
    case 'CLEAR_ALERT': {
      return {
        ...state,
        companyUpdateSuccess: false,
      };
    }
    default: {
      return state;
    }
  }
};
