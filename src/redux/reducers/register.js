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
    default: {
      return state;
    }
  }
};
