import jwt_decode from 'jwt-decode';

const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',
  id: 0,
  isWorker: false,
  isLoading: false,

  isEmailError: false,
  emailValidData: {},

  isResetError: false,
  isReset: false,
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
        isEmailError: false,
        emailValidData: {},
        isResetError: false,
        isReset: false,
      };
    }
    case 'FORGOT_PASSWORD_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'Checking your email. Please wait..',
      };
    }
    case 'FORGOT_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isEmailError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'FORGOT_PASSWORD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isEmailError: false,
        emailValidData: action.payload.data.validate,
        alertMsg: action.payload.data.message,
      };
    }
    case 'RESET_PASSWORD_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'Resetting your password. Please wait..',
      };
    }
    case 'RESET_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isResetError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'RESET_PASSWORD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isResetError: false,
        isReset: true,
        alertMsg: action.payload.data.message,
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
