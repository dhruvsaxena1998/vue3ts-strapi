import { DebugType } from "./types";

export default (type: DebugType, value: unknown): void => {
  if (process.env.NODE_ENV !== "development") return;

  switch (type) {
    case DebugType.LOG:
      console.log(`${[DebugType.LOG]}: ${value}`);
      break;
    case DebugType.WARN:
      console.warn(`${[DebugType.WARN]}: ${value}`);
      break;
    case DebugType.ERROR:
      console.error(`${[DebugType.ERROR]}: ${value}`);
  }
};
