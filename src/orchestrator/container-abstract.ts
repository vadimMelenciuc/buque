import { ModuleEmitter } from './bus';
import { Logger } from '../logger';

export abstract class Container<T, P extends Array<keyof T>> extends ModuleEmitter {
  protected logger: Logger;
  constructor(public id: string, private dependencyTypes?: P) {
    super(id);
    this.logger = new Logger(id);
  }
  public abstract start(dependencies?: { [P1 in P[number]]: T[P1] }): void | Promise<void>;
}


