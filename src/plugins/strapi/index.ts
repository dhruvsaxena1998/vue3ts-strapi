import { reactive } from "vue";
import Axios, { AxiosInstance } from "axios";
import Storage from "./storage";
import * as Types from "./types";

const defaults: Types.Defaults = {
  url: process.env.STRAPI_URL || "http://localhost:1337",
  entities: [],
  storage: Types.StorageType.COOKIES,
  storagePrefix: "strapi",
};

class Strapi {
  #state: Types.initState;
  $http: AxiosInstance;
  storage: Storage;

  constructor(options: Types.Defaults) {
    const instance = Axios.create({
      baseURL: options.url || defaults.url,
    });

    this.#state = reactive({ user: null });
    this.$http = instance;
    this.storage = new Storage(
      options.storage || defaults.storage,
      options.storagePrefix || defaults.storagePrefix
    );

    this.setAuthorizationToken(this.getAuthorizationToken())
  }

  get user(): Types.User | null {
    return this.#state.user;
  }

  set user(user: Types.User | null) {
    this.#state.user = user;
  }

  setUser(user: Types.User) {
    this.user = user
  }

  async authorization (data: Types.UserLogin | Types.UserRegister, url: string) {
    this.clearAuthorizationToken()
    try {
      const { data: { jwt, user }} = await this.$http.post(url, data)
      this.setAuthorizationToken(jwt)
      this.setUser(user)
    } catch (e) {
      return new Error(e)
    }
  }

  async register (data: Types.UserRegister, url = "/auth/local/register") {
    return await this.authorization(data, url)
  }

  async login (data: Types.UserLogin, url = "/auth/local") {
    return await this.authorization(data, url)
  }

  async forgotPassword (data: Types.ForgotPassword, url = '/auth/forgot-password') {
    try {
      const { data: ok } = await this.$http.post(url, data)

      return ok
    } catch (e) {
      return new Error(e)
    }
  }

  getAuthorizationToken(): string | false {
    if (this.storage.getItem(Types.Keys.AUTHTOKEN)) {
      return String(this.storage.getItem(Types.Keys.AUTHTOKEN))
    } else {
      return false
    }
  }

  clearAuthorizationToken(): void {
    this.storage.removeItem(Types.Keys.AUTHTOKEN);
    this.removeAuthorizationToken()
  }

  // Set authorization token to default headers
  setAuthorizationToken(token: string | false): boolean {
    if (token) {
      this.$http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.storage.setItem(Types.Keys.AUTHTOKEN, token, {
        expires: 10
      })
      return true
    }
    return false
  }

  // Remove authorization token from default headers
  removeAuthorizationToken(): boolean {
    if (this.$http.defaults.headers && this.$http.defaults.headers.common) {
      delete this.$http.defaults.headers.common["Authorization"];
      return true
    }
    return false
  }
}

const strapi = {
  install: (Vue, options = defaults) => {
    const instance: Strapi = new Strapi(options);

    Vue.provide('$strapi', instance);
    Vue.config.globalProperties.$strapi = instance
  }
}

export default strapi;