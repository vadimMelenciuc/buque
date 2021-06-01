import { Bus } from '@costadvl/school-bus';
import { appKey } from '../events';

class ModuleBusWrapper extends Bus {
  constructor() {
    super('ModuleBus');
  }
  public notify(event: string, emitter: string, action: any) {
    super.notify(`${appKey}.*`, emitter, action);
  }
}

export const ModuleBus = new ModuleBusWrapper();
