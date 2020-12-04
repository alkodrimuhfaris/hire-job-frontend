const initialState = {
  profileData: {},
  profileIsLoading: false,
  profileIsError: false,
  profileAlertMsg: '',
  updateProfileIsLoading: false,
  updateProfileIsError: false,
  updateProfileAlertMsg: '',
  experienceIsAdded: false,
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
    // add experience
    case 'ADD_EXPERIENCE_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'ADD_EXPERIENCE_REJECTED': {
      return {
        ...state,
        profileIsError: true,
        profileIsLoading: false,
        profileAlertMsg: 'add experience worker denied',
      };
    }
    case 'ADD_EXPERIENCE_FULFILLED': {
      return {
        ...state,
        experienceIsAdded: true,
        profileIsError: false,
        profileIsLoading: false,
        profileAlertMsg: 'add experience worker succcess',
      };
    }
    // add portofolio
    case 'ADD_PORTOFOLIO_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'ADD_PORTOFOLIO_REJECTED': {
      return {
        ...state,
        profileIsError: true,
        profileIsLoading: false,
        profileAlertMsg: 'add portofolio denied',
      };
    }
    case 'ADD_PORTOFOLIO_FULFILLED': {
      return {
        ...state,
        experienceIsAdded: true,
        profileIsError: false,
        profileIsLoading: false,
        profileAlertMsg: 'portofolio added',
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
