import { create } from 'zustand';
import { authAPI, habitsAPI } from '../services/api';

export const useAppStore = create((set) => ({
  // Auth State
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  // Habits State
  habits: [],
  selectedHabit: null,

  // Analytics State
  analytics: null,
  predictions: null,

  // Auth Actions
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token, isAuthenticated: !!token });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      set({
        token,
        user,
        isAuthenticated: true,
        loading: false,
      });
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({
        error: errorMessage,
        loading: false,
      });
      throw error;
    }
  },

  register: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register(email, password, name);
      const { token, user } = response.data;
      set({
        token,
        user,
        isAuthenticated: true,
        loading: false,
      });
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({
        error: errorMessage,
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      habits: [],
      selectedHabit: null,
    });
  },

  // Habits Actions
  fetchHabits: async () => {
    set({ loading: true });
    try {
      const response = await habitsAPI.getAll();
      set({ habits: response.data.habits, loading: false });
      return response.data.habits;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createHabit: async (habitData) => {
    try {
      const response = await habitsAPI.create(habitData);
      set((state) => ({
        habits: [...state.habits, response.data.habit],
      }));
      return response.data.habit;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateHabit: async (habitId, habitData) => {
    try {
      const response = await habitsAPI.update(habitId, habitData);
      set((state) => ({
        habits: state.habits.map((h) =>
          h.habitId === habitId ? response.data.habit : h
        ),
      }));
      return response.data.habit;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  completeHabit: async (habitId) => {
    try {
      const response = await habitsAPI.complete(habitId);
      set((state) => ({
        habits: state.habits.map((h) =>
          h.habitId === habitId ? response.data.habit : h
        ),
      }));
      return response.data.habit;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteHabit: async (habitId) => {
    try {
      await habitsAPI.delete(habitId);
      set((state) => ({
        habits: state.habits.filter((h) => h.habitId !== habitId),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
