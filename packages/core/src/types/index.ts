import { TemplateSchema } from "./template-schema";

export interface ArmariosPaginaCoreOptions {
  template: TemplateSchema;
  sources: string[];
  write?: string;
  strict: true;
  allowArbitraryFxExecution: false;
  autoMask: true;
}