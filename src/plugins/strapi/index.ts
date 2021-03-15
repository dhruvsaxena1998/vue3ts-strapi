import Vue, { reactive } from "vue";
import Axios, { AxiosInstance } from "axios";
import Storage from "./storage";
import { initState, Defaults, StorageType, Keys, User } from "./types";

const defaults: Defaults = {
  url: process.env.STRAPI_URL || "http://localhost:1337",
  entities: [],
  storage: StorageType.COOKIES,
  storagePrefix: "strapi",
};

class Strapi {
  state: initState;
  $http: AxiosInstance;
  storage;

  constructor(options: Defaults) {
    const instance = Axios.create({
      baseURL: options.url || defaults.url,
    });

    this.state = reactive({ user: null });
    this.$http = instance;
    this.storage = new Storage(
      options.storage || defaults.storage,
      options.storagePrefix || defaults.storagePrefix
    );
  }

  get user(): User | null {
    return this.state.user;
  }

  set user(user: User | null) {
    this.state.user = user;
  }

  getAuthorizationToken() {
    return this.storage.getItem(Keys.AUTHTOKEN);
  }

  clearAuthorizationToken() {
    this.storage.removeItem(Keys.AUTHTOKEN);
    this.removeAuthorizationToken()
  }

  // Set authorization token to default headers
  setAuthorizationToken(token: string) {
    if (token) {
      this.$http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  // Remove authorization token from default headers
  removeAuthorizationToken() {
    if (this.$http.defaults.headers && this.$http.defaults.headers.common) {
      delete this.$http.defaults.headers.common["Authorization"];
    }
  }
}
