import {
  ForgotPassword,
  User,
  UserAuthResponse,
  UserLogin,
  UserRegister,
} from "./types";

export default interface StrapiInstance {
  user: User;
  setUser: (user: User) => void;
  register: (data: UserRegister) => UserAuthResponse;
  login: (data: UserLogin) => UserAuthResponse;
  logout: () => void;
  forgotPassword: (data: ForgotPassword) => boolean;
}
