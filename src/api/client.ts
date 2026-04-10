// This API client connects to the Express backend running in the same container

export interface User {
  uid: string;
  email: string;
  name: string;
  role: string;
}

const API_BASE_URL = '/api';

export const api = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }
    return response.json();
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }
    return response.json();
  },
  
  logout: async (): Promise<void> => {
    // In a real app, you might invalidate a token here
    return Promise.resolve();
  },
  
  getNotices: async (): Promise<any[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/notices`);
      if (!response.ok) return [];
      return response.json();
    } catch (e) {
      console.error("Failed to fetch notices, backend might be offline.");
      return [];
    }
  },
  
  getClubs: async (): Promise<any[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/clubs`);
      if (!response.ok) return [];
      return response.json();
    } catch (e) {
      console.error("Failed to fetch clubs, backend might be offline.");
      return [];
    }
  },
  
  createNotice: async (title: string, description: string, tag: string, authorId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, tag, authorId })
    });
    if (!response.ok) {
      throw new Error('Failed to create notice');
    }
  }
};
