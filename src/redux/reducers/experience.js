const initialState = {
  experienceData: [],
  experienceIsLoading: false,
  experienceIsError: false,
  experienceAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXPERIENCE_PENDING': {
      return {
        ...state,
        experienceIsLoading: true,
      };
    }
    case 'GET_EXPERIENCE_REJECTED': {
      return {
        ...state,
        experienceIsLoading: false,
        experienceIsError: true,
        experienceAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_EXPERIENCE_FULFILLED': {
      return {
        ...state,
        experienceIsLoading: true,
        experienceIsError: true,
        experienceData: action.payload.data.results,
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
