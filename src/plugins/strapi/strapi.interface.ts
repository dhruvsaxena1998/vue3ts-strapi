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
  register: (
    data: UserRegister,
    url?: string
  ) => Promise<UserAuthResponse | ErrorConstructor>;
  login: (
    data: UserLogin,
    url?: string
  ) => Promise<UserAuthResponse | ErrorConstructor>;
  loginWithProvider: (provider: string, url?: string) => void;
  completeLoginWithProvider: (
    callbackPage?: string,
    provider?: string
  ) => Promise<UserAuthResponse | boolean | ErrorConstructor>;
  logout: () => void;
  fetchUser: () => Promise<User | null | ErrorConstructor>;
  forgotPassword: (
    data: ForgotPassword,
    url?: string
  ) => Promise<boolean | ErrorConstructor>;
  resetPassword: (data: ResetPassword, url?: string) => Promise<void>;
  sendEmailConfirmation: (
    data: ForgotPassword,
    url?: string
  ) => Promise<SendEmailConfirmation>;
  find: (entity: string, params: string) => Promise<Array<any>>;
  findOne: (entity: string, params: string) => Promise<Object>;
  count: (entity: string, params: string) => Promise<number>;
  create: (entity: string, data: Object) => Promise<Object>;
  update: (
    entity: string,
    id: number | string,
    data: Object
  ) => Promise<Object>;
  delete: (entity: string, id: number | string) => Promise<Object>;
  graphql: (query: string) => Promise<Array<any> | Object>;
}
