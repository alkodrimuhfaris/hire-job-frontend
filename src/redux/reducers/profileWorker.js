const initialState = {
  profileData: {},
  profileExperience: {},
  dataWorker: {},
  experienceDetailData: {},
  profileIsLoading: false,
  profileIsError: false,
  profileAlertMsg: '',
  updateProfileIsLoading: false,
  addExperienceIsLoading: false,
  addPortofolioIsLoading: false,
  updateProfileIsError: false,
  updateProfileAlertMsg: '',
  experienceIsAdded: false,
  portfolioIsAdded: false,
  experienceDetailIsLoading: false,
  experienceDetailIsError: false,
  experienceDetailAlertMsg: '',
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
        addExperienceIsLoading: true,
      };
    }
    case 'ADD_EXPERIENCE_REJECTED': {
      return {
        ...state,
        profileIsError: true,
        addExperienceIsLoading: false,
        profileAlertMsg: 'add experience worker denied',
      };
    }
    case 'ADD_EXPERIENCE_FULFILLED': {
      return {
        ...state,
        experienceIsAdded: true,
        profileIsError: false,
        addExperienceIsLoading: false,
        profileAlertMsg: 'add experience worker succcess',
      };
    }
    // add portofolio
    case 'ADD_PORTOFOLIO_PENDING': {
      return {
        ...state,
        addPortofolioIsLoading: true,
      };
    }
    case 'ADD_PORTOFOLIO_REJECTED': {
      return {
        ...state,
        profileIsError: true,
        addPortofolioIsLoading: false,
        profileAlertMsg: 'add portofolio denied',
      };
    }
    case 'ADD_PORTOFOLIO_FULFILLED': {
      return {
        ...state,
        portfolioIsAdded: true,
        profileIsError: false,
        addPortofolioIsLoading: false,
        profileAlertMsg: 'portofolio added',
      };
    }
    // get experience
    case 'GET_EXP_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'GET_EXP_REJECTED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: true,
        profileAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_EXP_FULFILLED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: false,
        profileExperience: action.payload.data.results,
        dataExperienceWorker: action.payload.data,
      };
    }
    // get pagination experience
    case 'EXPERIENCE_SCROLL_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'EXPERIENCE_SCROLL_REJECTED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: true,
        profileAlertMsg: action.payload.response.data.message,
      };
    }
    case 'EXPERIENCE_SCROLL_FULFILLED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: false,
        profileExperience: action.payload.data.results,
        dataExperienceWorker: action.payload.data,
      };
    }
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
    case 'CLEAR_ALERT': {
      return {
        ...state,
        profileIsError: false,
        profileAlertMsg: '',
        updateProfileIsError: false,
        updateProfileAlertMsg: '',
        experienceIsAdded: false,
        portfolioIsAdded: false,
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
