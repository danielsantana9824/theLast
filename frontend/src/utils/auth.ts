import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  data: {
    _id: string;
    email: string;
    username: string;
    businessId: string;
    role: string;
  };
  exp: number;
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<DecodedToken>(token).data : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token: string) {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp < Date.now() / 1000;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  login(token: string) {
    localStorage.setItem('token', token);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
}

export default new AuthService(); 