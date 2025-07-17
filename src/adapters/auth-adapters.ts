import axios from 'axios';
import type { User } from '../interfaces/User';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthAdapter {
  login: (data: LoginRequest) => Promise<{ user: User }>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ user: User }>;
}

class AuthService implements AuthAdapter {
  private apiUrl: string = '/api/auth';

  async login(data: LoginRequest): Promise<{ user: User }> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, data);

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Login failed');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${this.apiUrl}/logout`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Logout failed');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async register(data: RegisterRequest): Promise<{ user: User }> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, data);

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Registration failed');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

export const authAdapter: AuthAdapter = new AuthService();
