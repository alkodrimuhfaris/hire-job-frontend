const initialState = {
  expDetail: {},
  expIsLoading: false,
  expIsError: false,
  expAlertMsg: '',

  deleteIsLoading: false,
  deleteIsError: false,
  deleteAlert: '',
  isDelete: false,

  editIsLoading:false,
  editAlert:'',
  editIsError:false,
  isEdit:false
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EXP_PENDING': {
      return {
        ...state,
        editIsLoading: true,
        editAlert: 'Edit experience in progress. Please wait..',
      };
    }
    case 'UPDATE_EXP_REJECTED': {
      return {
        ...state,
        editIsLoading: false,
        editIsError: true,
        editAlert: action.payload.response.data.message,
      };
    }
    case 'UPDATE_EXP_FULFILLED': {
      return {
        ...state,
        editIsLoading: false,
        editIsError: false,
        isEdit: true,
        editAlert: 'Successfully edit experience',
      };
    }
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
