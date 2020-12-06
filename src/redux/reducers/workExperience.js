const initialState = {
  expDetail: {},
  expIsLoading: false,
  expIsError: false,
  expAlertMsg: '',

  deleteIsLoading: false,
  deleteIsError: false,
  deleteAlert: '',
  isDelete: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXP_DETAIL_PENDING': {
      return {
        ...state,
        expIsLoading: true,
      };
    }
    case 'GET_EXP_DETAIL_REJECTED': {
      return {
        ...state,
        expIsLoading: false,
        expIsError: true,
        expAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_EXP_DETAIL_FULFILLED': {
      return {
        ...state,
        expIsLoading: false,
        expIsError: false,
        expDetail: action.payload.data.results,
      };
    }
    case 'DELETE_EXP_PENDING': {
      return {
        ...state,
        deleteIsLoading: true,
        deleteAlert: 'Removing exp. Please wait..',
      };
    }
    case 'DELETE_EXP_REJECTED': {
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsError: true,
        deleteAlert: action.payload.response.data.message,
      };
    }
    case 'DELETE_EXP_FULFILLED': {
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsError: false,
        isDelete: true,
        deleteAlert: 'Successfully remove exp from list',
      };
    }
    case 'CLEAR_ALERT': {
      return {
        ...state,
        deleteIsError: false,
        isDelete: false,
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
