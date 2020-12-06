const initialState = {
  experienceDetailData: {},
  experienceDetailIsLoading: false,
  experienceDetailIsError: false,
  experienceDetailAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXPERIENCE_DETAIL_PENDING': {
      return {
        ...state,
        experienceDetailIsLoading: true,
      };
    }
    case 'GET_EXPERIENCE_DETAIL_REJECTED': {
      return {
        ...state,
        experienceDetailIsLoading: false,
        experienceDetailIsError: true,
        experienceDetailAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_EXPERIENCE_DETAIL_FULFILLED': {
      return {
        ...state,
        experienceDetailIsLoading: true,
        experienceDetailIsError: true,
        experienceDetailData: action.payload.data.results,
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
