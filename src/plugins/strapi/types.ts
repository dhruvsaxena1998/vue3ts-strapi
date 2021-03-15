type Defaults = {
  url: string;
  entities: string[];
  storage?: StorageType
  storagePrefix?: string;
}

type Role = {
  _id: number | string;
  id: number | string;
  name: string;
  description: string;
  type: string;
  __v: number;
}

type User = {
  confirmed: boolean;
  blocked: boolean;
  _id: number | string;
  id: number | string;
  username: string;
  email: string;
  provider: string;
  createdAt: string;
  __v: number;
  role: Role;
}

type initState = {
  user: null | User;
}

enum StorageType {
  COOKIES,
  LOCALSTORAGE,
  SESSIONSTORAGE
}

enum DebugType {
  LOG,
  WARN,
  ERROR
}

enum Keys {
  AUTHTOKEN = 'AUTHTOKEN'
}

export {
  Defaults,
  initState,
  StorageType,
  DebugType,
  Keys,
  User
}