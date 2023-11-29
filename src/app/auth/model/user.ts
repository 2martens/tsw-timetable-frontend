export interface User {
  username: string;
  email: string;
  roles: string[];
}

export const ANONYMOUS_USER: User = {
  username: 'ANONYMOUS',
  email: '',
  roles: []
}
