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

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
}

export interface UpdateUserResponse {
  message: string;
  user: User;
}

export interface DeleteAccountRequest {
  password: string;
}

export interface DeleteAccountResponse {
  message: string;
}

interface AuthAdapter {
  login: (data: LoginRequest) => Promise<{ user: User }>;
  logout: () => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ user: User }>;
  updateProfile: (data: UpdateUserRequest) => Promise<UpdateUserResponse>;
  deleteAccount: (password: string) => Promise<DeleteAccountResponse>;
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
      await axios.post(
        `${this.apiUrl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
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

  async updateProfile(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    try {
      const response = await axios.put(`${this.apiUrl}/me`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Failed to update profile');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  async deleteAccount(password: string): Promise<DeleteAccountResponse> {
    try {
      const response = await axios.delete(`${this.apiUrl}/me`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: { password },
      });
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error || 'Failed to delete account');
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

export const authAdapter: AuthAdapter = new AuthService();
