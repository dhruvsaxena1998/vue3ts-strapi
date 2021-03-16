import {
  ForgotPassword,
  ResetPassword,
  SendEmailConfirmation,
  User,
  UserAuthResponse,
  UserLogin,
  UserRegister,
} from "./types";

export default interface StrapiInstance {
  user: User;
  setUser: (user: User) => void;
  register: (data: UserRegister, url?: string) => UserAuthResponse;
  login: (data: UserLogin, url?: string) => UserAuthResponse;
  logout: () => void;
  fetchUser: () => User | null;
  forgotPassword: (data: ForgotPassword, url?: string) => boolean;
  resetPassword: (data: ResetPassword, url?: string) => void;
  sendEmailConfirmation: (
    data: ForgotPassword,
    url?: string
  ) => SendEmailConfirmation;
  find: (entity: string, params: string) => Array<any>;
  findOne: (entity: string, params: string) => Object;
  count: (entity: string, params: string) => number;
  create: (entity: string, data: Object) => Object;
  update: (entity: string, id: number | string, data: Object) => Object;
  delete: (entity: string, id: number | string) => Object;
  graphql: (query: string) => Array<any> | Object;
}
