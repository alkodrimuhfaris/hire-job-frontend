import store from '../redux/store';
import jwtDecode from 'jwt-decode';

export default function getProtectedThing() {
  const state = store().store.getState();
  const token = state.auth.token;

  const {exp} = jwtDecode(token);

  if (Date.now() > exp * 1000) {
  }
}
