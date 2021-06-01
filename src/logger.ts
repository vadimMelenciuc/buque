import { Config } from "./config";

export class Logger {
  public id: string;
  constructor(id?: string) {
    this.id = id || "no-id";
  }
  info(...args): void {
    if (Config.logger.active) {
      return;
    }
    console.log(this.id, ...args);
  }

  error(...args): void {
    if (Config.logger.active) {
      return;
    }
    console.error(this.id, ...args);
  }

  warn(...args): void {
    if (Config.logger.active) {
      return;
    }
    console.warn(this.id, ...args);
  }
}
