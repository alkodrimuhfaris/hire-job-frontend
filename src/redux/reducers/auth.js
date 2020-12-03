import jwt_decode from 'jwt-decode';

const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',
  id: 0,
  isWorker: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'Loggin in. Please wait..',
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'LOGIN_FULFILLED': {
      const {roleId, id} = jwt_decode(action.payload.data.token);
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isError: false,
        isLogin: true,
        isWorker: roleId === 2 ? true : false,
        id,
        alertMsg: 'Successfully login',
      };
    }
    case 'CLEAR_ALERT': {
      return {
        ...state,
        isError: false,
        alertMsg: '',
      };
    }
    case 'LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
