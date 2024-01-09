
import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken, history) {
    localStorage.setItem('id_token', idToken);
    // Use history.push to navigate to the desired route
    history.push('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    // Replace the current URL with the desired route
    window.location.replace('/');
  }
}

export default new AuthService();