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
  postSkillIsSuccess: false,
  postSkillIsError: false,
  postSkillAlertMsg: '',
  deleteSkillLoading: false,
  deleteSkillError: false,
  deleteSkillSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SKILL_PENDING': {
      return {
        ...state,
        skillIsLoading: true,
        postSkillIsSuccess: false,
      };
    }
    case 'GET_SKILL_REJECTED': {
      return {
        ...state,
        skillIsLoading: false,
        skillIsError: true,
        postSkillIsSuccess: false,
        skillAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_SKILL_FULFILLED': {
      return {
        ...state,
        skillIsLoading: false,
        skillIsError: false,
        postSkillIsSuccess: false,
        skillData: action.payload.data.results,
      };
    }
    case 'LIST_SKILL_PENDING': {
      return {
        ...state,
        listSkillIsLoading: true,
        postSkillIsSuccess: false,
      };
    }
    case 'LIST_SKILL_REJECTED': {
      return {
        ...state,
        listSkillIsLoading: false,
        listSkillIsError: true,
        postSkillIsSuccess: false,
        listSkillAlertMsg: action.payload.response.data.message,
      };
    }
    case 'LIST_SKILL_FULFILLED': {
      return {
        ...state,
        listSkillIsLoading: false,
        listSkillIsError: false,
        postSkillIsSuccess: false,
        listSkillData: action.payload.data.results,
      };
    }
    case 'POST_SKILL_PENDING': {
      return {
        ...state,
        postSkillIsLoading: true,
        postSkillIsSuccess: false,
        postSkillIsError: false,
      };
    }
    case 'POST_SKILL_REJECTED': {
      return {
        ...state,
        postSkillIsLoading: false,
        postSkillIsError: true,
        postSkillIsSuccess: false,
        postSkillAlertMsg: action.payload.response.data.message,
      };
    }
    case 'POST_SKILL_FULFILLED': {
      return {
        ...state,
        postSkillIsLoading: false,
        postSkillIsError: false,
        postSkillIsSuccess: true,
      };
    }
    case 'DELETE_SKILL_PENDING': {
      return {
        ...state,
        deleteSkillLoading: true,
        deleteSkillError: false,
        deleteSkillSuccess: false,
      };
    }
    case 'DELETE_SKILL_REJECTED': {
      return {
        ...state,
        deleteSkillLoading: false,
        deleteSkillError: true,
        deleteSkillSuccess: false,
      };
    }
    case 'DELETE_SKILL_FULFILLED': {
      return {
        ...state,
        deleteSkillLoading: false,
        deleteSkillError: false,
        deleteSkillSuccess: true,
      };
    }
    case 'CLEAR_SKILL': {
      return {
        ...state,
        skillData: [],
        skillIsLoading: false,
        skillIsError: false,
        skillAlertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
