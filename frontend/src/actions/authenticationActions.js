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
    const config = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    dispatch(startLogin());

    fetch(`${REACT_APP_API_URL}/users/login`, config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.err);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        dispatch(loginSuccess());
      })
      .catch((err) => {
        dispatch(loginFailure());
        console.log(err);
      });
  };
};
