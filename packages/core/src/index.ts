import { loadJimp } from './lib';
import { ArmariosPaginaCoreOptions } from './types';
import { generateValidator } from './lib/node-assert';

const assertions = {
  optionsValidate: ({ sources, template }: ArmariosPaginaCoreOptions) => {
    if (sources.length < template.sources.length) {
      return {
        message: `[error] This template requires ${template.sources.length} sources but it's only given ${sources.length}.`,
        code: 1,
      };
    }

    return {
      code: 0,
    };
  },
};

export default async (options: ArmariosPaginaCoreOptions) => {
  const assert = generateValidator(options);
  assert(assertions.optionsValidate, options);

  const { template, sources } = options;
  const base = await loadJimp(template.base);

  return base;
};
