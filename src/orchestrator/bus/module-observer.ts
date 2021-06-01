import { BusObserver } from '@costadvl/school-bus';
import { appKey, ModuleEvents } from '../events';
import { ModuleAction } from '../models';
import { ModuleBus } from './module-bus';

export abstract class ModuleObserver extends BusObserver {
  constructor(id: string) {
    super(id);
    for (const event in ModuleEvents) {
      if (isNaN(Number(event))) {
        this.observeEvent(`${appKey}.${event}`);
      }
    }
    ModuleBus.registerObserver(this);
  }
  public abstract notification(subscribedEvent: string, emitterId: string, action: ModuleAction | string): void;
}
