const initialState = {
  companyPhotoData: [],
  companyPhotoIsLoading: false,
  companyPhotoIsError: false,
  companyPhotoAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTO_COMPANY_PENDING': {
      return {
        ...state,
        companyPhotoIsLoading: true,
      };
    }
    case 'UPDATE_PHOTO_COMPANY_REJECTED': {
      return {
        ...state,
        companyPhotoIsLoading: false,
        companyPhotoIsError: true,
        companyPhotoAlertMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PHOTO_COMPANY_FULFILLED': {
      return {
        ...state,
        companyPhotoIsLoading: false,
        companyPhotoIsError: false,
        companyPhotoData: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
};
