import Cookies, { CookieAttributes } from "js-cookie";
import { StorageType, DebugType } from "./types";
import Debug from './debug'

// Web-Storage Adapters
export default class Storage {
  storage: StorageType;
  _prefix: string;

  constructor(storage = StorageType.COOKIES, prefix: string = 'strapi') {
    this.storage = storage;
    this._prefix = prefix;
  }

  _generateKey (key: string): string {
    return `${this._prefix}:${key}`
  }
  

  getItem(key: string): any {
    key = this._generateKey(key);

    switch (this.storage) {
      case StorageType.COOKIES:
        return Cookies.get(key);
      case StorageType.LOCALSTORAGE:
        return localStorage.getItem(key);
      case StorageType.SESSIONSTORAGE:
        return sessionStorage.getItem(key);
    }
  }

  setItem(
    key: string,
    value: string,
    options: {} | CookieAttributes = {}
  ): boolean {
    key = this._generateKey(key);

    switch (this.storage) {
      case StorageType.COOKIES:
        Cookies.set(key, value, options);
        return true;
      case StorageType.LOCALSTORAGE:
        localStorage.setItem(key, value);
        return true;
      case StorageType.SESSIONSTORAGE:
        sessionStorage.setItem(key, value);
        return true;
      default:
        return false;
    }
  }

  removeItem(key: string, options: {} | CookieAttributes = {}): boolean {
    key = this._generateKey(key);

    switch (this.storage) {
      case StorageType.COOKIES:
        // NOTE: When deleting cookie you must pass the exact same path and domain attributes that were used to set the cookie
        Cookies.remove(key, options);
        return true;
      case StorageType.LOCALSTORAGE:
        localStorage.removeItem(key);
        return true
      case StorageType.SESSIONSTORAGE:
        sessionStorage.removeItem(key);
      default: return false;
    }
  }

  clear (): boolean{
    switch (this.storage) {
      case StorageType.COOKIES:
        // TODO: Clear all cookies
        Debug(DebugType.LOG, "WIP - Cannot clear all cookies")
        return false;
      case StorageType.LOCALSTORAGE:
        localStorage.clear();
        return true
      case StorageType.SESSIONSTORAGE:
        sessionStorage.clear();
        return true;
      default: return false;
    }
  }
}
