import axios from 'axios';

// SET_AUTHENTICATED
export const setAuthenticated = () => ({
  type: 'SET_AUTHENTICATED',
});

// START_LOGIN
export const startLogin = () => ({
  type: 'START_LOGIN',
});

// LOGIN_SUCCESS
export const loginSuccess = () => ({
  type: 'LOGIN_SUCCESS',
});

// LOGIN_FAILURE
export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

export const handleLogin = (email, password) => {
  return (dispatch) => {
    dispatch(startLogin());

    axios
      .post(
        `${REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result.data);
        dispatch(loginSuccess());
      })
      .catch((err) => {
        dispatch(loginFailure());
        console.log(err);
      });
  };
};
