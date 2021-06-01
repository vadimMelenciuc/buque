import { v4 as uuidV4 } from 'uuid';

export const appKey = uuidV4();

export enum ModuleEvents {
  closeAll = 'closeAll',
  closeById = 'closeById',
}
