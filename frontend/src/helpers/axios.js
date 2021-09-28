import axios from 'axios';
import { store } from '../app';
import { refreshAccessToken } from '../actions/authenticationActions';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (res) => res,
  (_err) => {
    axios
      .post(
        `${REACT_APP_API_URL}/auth/token/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        store.dispatch(refreshAccessToken(result.data));
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
);

export default axiosInstance;
