export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface BackendUser {
  id: string;
  name: string;
  email: string;
}

export const ANONYMOUS_USER: User = {
  id: '',
  username: 'ANONYMOUS',
  email: '',
  roles: []
}
