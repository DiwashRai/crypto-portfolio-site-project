const authenticationReducerDefaultState = {
  isFetching: false,
  isAuthenticated: false,
  accessToken: undefined,
};

export default (state = authenticationReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'START_LOGIN':
      return {
        isFetching: true,
        isAuthenticated: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        isFetching: false,
        isAuthenticated: true,
        accessToken: action.accessToken,
      };
    case 'LOGIN_FAILURE':
      return {
        isFetching: false,
        isAuthenticated: false,
        accessToken: undefined,
      };
    case 'REFRESH_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};
