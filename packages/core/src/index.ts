import {
  loadJimp,
  imageSizeFromPostion,
  imageSizeFromJimp,
  jimpApplyFx,
} from './lib';
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

  const { autoMask = true, template, sources } = options;
  const base = await loadJimp(template.base);
  const globalMask = autoMask && base.clone();
  if (autoMask) {
    globalMask.scan(0, 0, globalMask.bitmap.width, globalMask.bitmap.height, function(_, __, idx) {
      const alpha = this.bitmap.data[idx + 3];
      this.bitmap.data[idx + 0] = 255 - alpha;
      this.bitmap.data[idx + 1] = 255 - alpha;
      this.bitmap.data[idx + 2] = 255 - alpha;
    });
  }

  for (const i in template.sources) {
    const model = template.sources[i];
    const mask = template.mask ? await loadJimp(template.mask) : undefined;
    const source = await loadJimp(sources[i]);

    // apply fx to the source
    jimpApplyFx(options, model.preFx, source);

    // create an empty image with the size of the base
    const plank = await loadJimp([...imageSizeFromJimp(base), '#0000']);

    // resize image to fit into the especified position
    source[model.compose.fillmode || 'resize'](...imageSizeFromPostion(model));

    // compose the source to the plank at specified position
    plank.composite(source, ...model.compose.start);

    // apply mask to the plank
    if (mask) {
      plank.mask(mask, 0, 0);
    }
    if (autoMask) {
      plank.mask(globalMask, 0, 0);
    }

    // apply fx to the plank
    jimpApplyFx(options, model.postFx, plank);

    // compose plank image to the base
    base.composite(plank, 0, 0, model.compose.blendMode);
  }

  if (options.write && options.write.trim()) {
    base.write(options.write);
  }

  return base;
};
