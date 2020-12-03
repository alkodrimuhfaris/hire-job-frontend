const initialState = {
  isRegistry: false,
  isError: false,
  isLoading: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_WORKER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'REGISTER_WORKER_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: 'register as worker denied',
      };
    }
    case 'REGISTER_WORKER_FULFILLED': {
      return {
        ...state,
        isRegistry: true,
        isError: false,
        isLoading: false,
        message: 'register as worker succcess',
      };
    }
    case 'REGISTER_RECRUITER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'REGISTER_RECRUITER_REJECTED': {
      return {
        ...state,
        isError: true,
        isLoading: false,
        message: 'Register as recruiter denied',
      };
    }
    case 'REGISTER_RECRUITER_FULFILLED': {
      return {
        ...state,
        isRegistry: true,
        isError: false,
        isLoading: false,
        message: 'Register as recruiter succcess',
      };
    }
    case 'CLEAR_ALERT': {
      return {
        ...state,
        isError: false,
        alertMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};
