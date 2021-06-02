import { Role } from './role.interface';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Array<Role>;
  createdAt: string;
}
