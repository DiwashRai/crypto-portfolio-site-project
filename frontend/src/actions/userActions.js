// SET_USER
export const setUser = (user) => ({
  type: 'SET_USER',
  user,
});

export const startSetUser = () => {
  return (dispatch) => {
    const config = {
      method: 'GET',
      credentials: 'include',
    };

    return fetch(`${REACT_APP_API_URL}/users/me`, config)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Unable to GET user profile');
        }
        return response.json();
      })
      .then((user) => {
        dispatch(setUser(user));
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
