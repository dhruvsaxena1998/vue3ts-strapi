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
  [key: string]: any;
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
  [key: string]: any; // dynamic properites
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

export interface UserAuthResponse {
  jwt: string;
  user: User;
}

export type ForgotPassword = {
  email: string;
}


export type ResetPassword = {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export type SendEmailConfirmation = {
  email: string;
  sent: boolean;
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
  AUTHTOKEN = 'AUTHTOKEN',
  PROVIDER = 'PROVIDER'
}