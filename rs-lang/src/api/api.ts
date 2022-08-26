import axios from 'axios';
import { StoreType } from '../store/store';
import { logout, updateToken } from '../store/userSlice';



const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let store: StoreType

export const injectStore = (_store: StoreType) => { // to avoid cyclical dependence
  store = _store
}

instance.interceptors.request.use(function (config) {
  const token = store.getState().user.user?.token;
  config.headers!.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const rs = await axios.get(`${process.env.REACT_APP_API_URL}users/${store.getState().user.user?.userId}/tokens`, {
          headers: {
            Authorization: `Bearer ${store.getState().user.user?.refreshToken}`,
          }
        });
        console.log(rs.data);
        store.dispatch(updateToken(rs.data));
        return instance.request(originalRequest);
      } catch (e) {
        console.log('user is not authorized');
        store.dispatch(logout());
      }
    }
    throw error;
  }
)

export default instance;