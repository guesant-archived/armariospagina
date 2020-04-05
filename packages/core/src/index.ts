import { loadJimp, jimpApplyFx } from './lib';
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

  for (const i in template.sources) {
    const model = template.sources[i];
    const mask = template.mask ? await loadJimp(template.mask) : undefined;
    const source = await loadJimp(sources[i]);

    // apply fx to the source
    jimpApplyFx(options, model.preFx, source);
  }
  return base;
};
