const initialState = {
  skillData: [],
  skillIsLoading: false,
  skillIsError: false,
  skillAlertMsg: '',
  listSkillData: [],
  listSkillIsLoading: false,
  listSkillIsError: false,
  listSkillAlertMsg: '',
  postSkillIsLoading: false,
  postSkillIsError: false,
  postSkillAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SKILL_PENDING': {
      return {
        ...state,
        skillIsLoading: true,
      };
    }
    case 'GET_SKILL_REJECTED': {
      return {
        ...state,
        skillIsLoading: false,
        skillIsError: true,
        skillAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_SKILL_FULFILLED': {
      return {
        ...state,
        skillIsLoading: false,
        skillIsError: false,
        skillData: action.payload.data.results,
      };
    }
    case 'LIST_SKILL_PENDING': {
      return {
        ...state,
        listSkillIsLoading: true,
      };
    }
    case 'LIST_SKILL_REJECTED': {
      return {
        ...state,
        listSkillIsLoading: false,
        listSkillIsError: true,
        listSkillAlertMsg: action.payload.response.data.message,
      };
    }
    case 'LIST_SKILL_FULFILLED': {
      return {
        ...state,
        listSkillIsLoading: false,
        listSkillIsError: false,
        listSkillData: action.payload.data.results,
      };
    }
    case 'POST_SKILL_PENDING': {
      return {
        ...state,
        postSkillIsLoading: true,
      };
    }
    case 'POST_SKILL_REJECTED': {
      return {
        ...state,
        postSkillIsLoading: false,
        postSkillIsError: true,
        postSkillAlertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_SKILL_FULFILLED': {
      return {
        ...state,
        postSkillIsLoading: false,
        postSkillIsError: false,
      };
    }
    default: {
      return state;
    }
  }
};
