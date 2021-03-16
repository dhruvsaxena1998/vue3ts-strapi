export type Defaults = {
  url: string;
  entities: string[];
  storage?: StorageType;
  storagePrefix?: string;
}

export type Role = {
  _id: number | string;
  id: number | string;
  name: string;
  description: string;
  type: string;
  __v: number;
}

export interface User {
  confirmed: boolean;
  blocked: boolean;
  _id: number | string;
  id: number | string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: Role;
}

export type UserRegister = {
  email: string;
  username: string;
  password: string;
}

export type UserLogin = {
  identifier: string;
  password: string;
}

interface UserAuthResponse {
  jwt: string;
  user: User;
}

export type ForgotPassword = {
  email: string;
}

export interface StrapiInstance {
  user: User;
  setUser: (user: User) => void;
  register: (data: UserRegister) => UserAuthResponse;
  login: (data: UserLogin) => UserAuthResponse;
  forgotPassword: (data: ForgotPassword) => boolean;
}

export type initState = {
  user: null | User;
}

export enum StorageType {
  COOKIES = 'COOKIES',
  LOCALSTORAGE = 'LOCALSTORAGE',
  SESSIONSTORAGE = 'SESSIONSTORAGE'
}

export enum DebugType {
  LOG,
  WARN,
  ERROR
}

export enum Keys {
  AUTHTOKEN = 'AUTHTOKEN'
}