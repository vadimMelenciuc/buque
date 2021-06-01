import { BusEmitter } from '@costadvl/school-bus';
import { ModuleBus } from './module-bus';
import { appKey, ModuleEvents } from '../events';
import { ModuleAction } from '../models';

export class ModuleEmitter {
  public actionEmitter: BusEmitter;
  constructor(id: string) {
    this.actionEmitter = new BusEmitter(id, ModuleBus);
  }
  public send(event: ModuleEvents | keyof typeof ModuleEvents, action: ModuleAction) {
    this.actionEmitter.send(`${appKey}.${event}`, action);
  }
}
