import { reactive } from "vue";
import Axios, { AxiosInstance } from "axios";
import Storage from "./storage";

// Types
import * as Types from "./types";
import StrapiInstance from "./strapi.interface";
export { StrapiInstance };

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

    this.setAuthorizationToken(this.getAuthorizationToken());
  }

  get user(): Types.User | null {
    return this.#state.user;
  }

  set user(user: Types.User | null) {
    this.#state.user = user;
  }

  setUser(user: Types.User | null) {
    this.user = user;
  }

  async authorization(data: Types.UserLogin | Types.UserRegister, url: string) {
    this.clearAuthorizationToken();
    try {
      const {
        data: { jwt, user },
      } = await this.$http.post(url, data);
      this.setAuthorizationToken(jwt);
      this.setUser(user);
    } catch (e) {
      return new Error(e);
    }
  }

  async register(data: Types.UserRegister, url = "/auth/local/register") {
    return await this.authorization(data, url);
  }

  async login(data: Types.UserLogin, url = "/auth/local") {
    return await this.authorization(data, url);
  }

  logout() {
    this.setUser(null);
    this.clearAuthorizationToken();
  }

  async fetchUser(): Promise<Types.User | null | ErrorConstructor> {
    const authtoken = this.getAuthorizationToken();
    if (!authtoken) {
      return null;
    }

    this.setAuthorizationToken(authtoken);

    try {
      const user = <Types.User>await this.findOne("users", "me");
      this.setUser(user);

      return user;
    } catch (err) {
      return err;
    }
  }

  async forgotPassword(
    data: Types.ForgotPassword,
    url = "/auth/forgot-password"
  ): Promise<Boolean | ErrorConstructor> {
    try {
      const { data: ok } = await this.$http.post(url, data);

      return ok;
    } catch (e) {
      return e;
    }
  }

  async resetPassword(
    body: Types.ResetPassword,
    url = "/auth/reset-password"
  ): Promise<void> {
    this.clearAuthorizationToken();
    const {
      data: { user, jwt },
    } = await this.$http.post(url, body);

    this.saveAuthorizationToken(jwt);
    this.setUser(user);
  }

  async sendEmailConfirmation(
    body: Types.ForgotPassword,
    url = "/auth/send-email-confirmation"
  ): Promise<Types.SendEmailConfirmation> {
    const { data } = await this.$http.post(url, body);

    return data;
  }

  // Entities Queries
  async find(entity: string, params: string): Promise<Array<any> | Object> {
    const { data } = await this.$http.get(`/${entity}`, { params });

    return data;
  }

  async count(entity: string, params: string): Promise<number> {
    const { data } = await this.$http.get(`/${entity}/count`, { params });

    return data;
  }

  async findOne(entity: string, id: string | number): Promise<Object> {
    const { data } = await this.$http.get(`/${entity}/${id}`);

    return data;
  }

  async create(entity: string, body: Object): Promise<Object> {
    const { data } = await this.$http.post(`/${entity}`, body);

    return data;
  }

  async update(
    entity: string,
    id: string | number,
    body: Object
  ): Promise<Object> {
    const path = [entity, id].filter(Boolean).join("/");
    const { data } = await this.$http.put(`/${path}`, body);

    return data;
  }

  async delete(
    entity: string,
    id: number | string
  ): Promise<Array<any> | Object> {
    const path = [entity, id].filter(Boolean).join("/");
    const { data } = await this.$http.delete(`/${path}`);

    return data;
  }

  async graphql(query: string): Promise<Array<any> | Object> {
    const { data } = await this.$http.post("/graphql", query);

    return data;
  }

  getAuthorizationToken(): string | false {
    if (this.storage.getItem(Types.Keys.AUTHTOKEN)) {
      return String(this.storage.getItem(Types.Keys.AUTHTOKEN));
    } else {
      return false;
    }
  }

  saveAuthorizationToken(token: string): void {
    this.storage.setItem(Types.Keys.AUTHTOKEN, token);
    this.setAuthorizationToken(token);
  }

  clearAuthorizationToken(): void {
    this.storage.removeItem(Types.Keys.AUTHTOKEN);
    this.removeAuthorizationToken();
  }

  // Set authorization token to default headers
  setAuthorizationToken(token: string | false): boolean {
    if (token) {
      this.$http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      this.storage.setItem(Types.Keys.AUTHTOKEN, token, {
        expires: 10,
      });
      return true;
    }
    return false;
  }

  // Remove authorization token from default headers
  removeAuthorizationToken(): boolean {
    if (this.$http.defaults.headers && this.$http.defaults.headers.common) {
      delete this.$http.defaults.headers.common["Authorization"];
      return true;
    }
    return false;
  }
}

const strapi = {
  install: (Vue, options = defaults) => {
    const instance: Strapi = new Strapi(options);


    options.entities.forEach(entity => {
      const type = "collection";

      if (Object.prototype.hasOwnProperty.call(strapi, entity)) {
        return;
      }

      Object.defineProperty(strapi, entity, {
        get() {
          const self = this;
          return {
            single: {
              find(...args) {
                return self.find(entity, ...args);
              },
              update(...args) {
                return self.update(entity, ...args);
              },
              delete(...args) {
                return self.delete(entity, ...args);
              }
            },
            collection: {
              find(...args) {
                return self.find(entity, ...args);
              },
              findOne(...args) {
                return self.findOne(entity, ...args);
              },
              count(...args) {
                return self.count(entity, ...args);
              },
              create(...args) {
                return self.create(entity, ...args);
              },
              update(...args) {
                return self.update(entity, ...args);
              },
              delete(...args) {
                return self.delete(entity, ...args);
              }
            }
          }[type];
        }
      });
    });

    Vue.provide("$strapi", instance);
    Vue.config.globalProperties.$strapi = instance;
  },
};

export default strapi;
