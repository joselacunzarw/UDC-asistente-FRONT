export interface User {
  email: string;
  name: string;
  picture: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isDevelopmentMode: boolean;
  login: (user: User) => void;
  logout: () => void;
  toggleDevMode: () => void;
}