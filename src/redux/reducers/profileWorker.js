const initialState = {
  profileData: {},
  profileIsLoading: false,
  profileIsError: false,
  profileAlertMsg: '',
  updateProfileIsLoading: false,
  updateProfileIsError: false,
  updateProfileAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: true,
        profileAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: false,
        profileData: action.payload.data.results,
      };
    }
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        updateProfileIsLoading: true,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        updateProfileIsLoading: false,
        updateProfileIsError: true,
        updateProfileAlertMsg: action.payload.response.data.message,
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        updateProfileIsLoading: false,
        updateProfileIsError: false,
      };
    }
    default: {
      return state;
    }
  }
};
