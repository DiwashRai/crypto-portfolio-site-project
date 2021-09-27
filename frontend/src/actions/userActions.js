import axios from '../helpers/axios';
import { setAuthenticated } from '../actions/authenticationActions';

// SET_USER
export const setUser = (user) => ({
  type: 'SET_USER',
  user,
});

export const startSetUser = (accessToken) => {
  return (dispatch) => {
    return axios
      .get(`${REACT_APP_API_URL}/users/me`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        dispatch(setUser(response.data));
        dispatch(setAuthenticated());
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
