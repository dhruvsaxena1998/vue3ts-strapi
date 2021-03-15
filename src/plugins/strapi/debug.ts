import { DebugType } from "./types";

export default (type: DebugType, value: any, ...rest: any): void => {
  if (process.env.NODE_ENV !== "development") return;

  switch (type) {
    case DebugType.LOG:
      console.log(`${[DebugType.LOG]}: ${value}`, ...rest);
      break;
    case DebugType.WARN:
      console.warn(`${[DebugType.WARN]}: ${value}`, ...rest);
      break;
    case DebugType.ERROR:
      console.error(`${[DebugType.ERROR]}: ${value}`, ...rest);
  }
};
