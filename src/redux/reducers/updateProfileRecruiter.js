const initialState = {
  profileData: [],
  profileIsLoading: false,
  profileIsError: false,
  profileAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: true,
        profileAlertMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: false,
        profileData: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
};
