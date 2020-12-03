const initialState = {
  listAllChat: [],
  allChatPageInfo: {},
  isLoading: false,
  privateChat: [],
  profileColluctor: {},
  privateChatPageInfo: {},
  isError: false,
  alertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'getting user chats ...',
      };
    }
    case 'GET_USER_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLoading: false,
        profileColluctor: {
          name: action.payload.data.results.name,
          company: action.payload.data.results.company,
          photo: action.payload.data.results.photo,
          jobTitle: action.payload.data.results.jobTitle,
        },
        alertMsg: 'get list chats successfull',
      };
    }
    case 'GET_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'get list chats failed',
      };
    }
    case 'GET_LIST_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'getting list chats ...',
      };
    }
    case 'GET_LIST_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        listAllChat: action.payload.data.results,
        allChatPageInfo: action.payload.data.pageInfo,
        alertMsg: 'get list chats successfull',
      };
    }
    case 'GET_LIST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'get list chats failed',
      };
    }
    case 'LIST_SCROLL_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'getting next list chats ...',
      };
    }
    case 'LIST_SCROLL_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        listAllChat: [...state.listAllChat, ...action.payload.data.results],
        allChatPageInfo: {
          ...state.allChatPageInfo,
          ...action.payload.data.pageInfo,
        },
        alertMsg: 'get list chats next page successfull',
      };
    }
    case 'LIST_SCROLL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'get list chats next page failed',
      };
    }
    case 'GET_PRIVATE_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'getting private chat ...',
      };
    }
    case 'GET_PRIVATE_FULFILLED': {
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        privateChat: action.payload.data.results,
        privateChatPageInfo: action.payload.data.pageInfo,
        alertMsg: 'Get private chat successfull',
      };
    }
    case 'GET_PRIVATE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Get private chat failed',
      };
    }
    case 'PRIVATE_SCROLL_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'getting next page private chat ...',
      };
    }
    case 'PRIVATE_SCROLL_FULFILLED': {
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        privateChat: [...state.privateChat, ...action.payload.data.results],
        privateChatPageInfo: {
          ...state.privateChatPageInfo,
          ...action.payload.data.pageInfo,
        },
        profileColluctor: {
          ...state.profileColluctor,
          ...action.payload.data.colluctorProfile,
        },
        alertMsg: 'Get next page of private chat successfull',
      };
    }
    case 'PRIVATE_SCROLL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Get next page of private chat failed',
      };
    }
    case 'SEND_CHAT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Sending chat ...',
      };
    }
    case 'SEND_CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        privateChat: [action.payload.data.results, ...state.privateChat],
        alertMsg: 'Chat sent successfull',
      };
    }
    case 'SEND_CHAT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Sent chat failed',
      };
    }
    case 'READ_CHAT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false,
        alertMsg: 'Reading chat ...',
      };
    }
    case 'READ_CHAT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        alertMsg: 'Read chat successfull',
      };
    }
    case 'READ_CHAT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'Read chat failed',
      };
    }
    default: {
      return state;
    }
  }
};
