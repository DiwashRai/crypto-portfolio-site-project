const authenticationReducerDefaultState = {
  isFetching: false,
  isAuthenticated: false,
};

export default (state = authenticationReducerDefaultState, action) => {
  switch (action.type) {
    case 'START_LOGIN':
      return {
        isFetching: true,
        isAuthenticated: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        isFetching: false,
        isAuthenticated: true,
      };
    case 'LOGIN_FAILURE':
      return {
        isFetching: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
