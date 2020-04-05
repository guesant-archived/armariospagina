import { loadJimp } from './lib';
import { ArmariosPaginaCoreOptions } from './types';

export default async (options: ArmariosPaginaCoreOptions) => {
  const { template, sources } = options;
  const base = await loadJimp(template.base);

  return base;
};
