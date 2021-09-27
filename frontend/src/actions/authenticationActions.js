import axios from '../helpers/axios';

// SET_AUTHENTICATED
export const setAuthenticated = () => ({
  type: 'SET_AUTHENTICATED',
});

// START_LOGIN
export const startLogin = () => ({
  type: 'START_LOGIN',
});

// LOGIN_SUCCESS
export const loginSuccess = ({ accessToken }) => ({
  type: 'LOGIN_SUCCESS',
  accessToken,
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
        const { auth } = result.data;
        if (auth) {
          dispatch(loginSuccess(auth));
        } else {
          throw new Error('auth payload not received upon logon.');
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
        console.log(err);
      });
  };
};

// REFRESH_ACCESS_TOKEN
export const refreshAccessToken = ({ accessToken }) => ({
  type: 'REFRESH_ACCESS_TOKEN',
  accessToken,
});
