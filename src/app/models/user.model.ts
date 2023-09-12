export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin";
}

export type CreateUsertDTO = Omit<User, 'id'>
