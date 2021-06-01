export interface ModuleAction {
  message: string;
  code?: string;
  cb?: () => void;
}
