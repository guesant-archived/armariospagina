import Jimp from 'jimp';
import { ArmariosPaginaCoreOptions } from '../types';
import { TemplateSchemaSource } from '../types/template-schema';
import { validate } from './node-assert';

const assertions = {
  arbitraryFxExecution: (fx: string) => {
    return {
      message: `\n[warn] Invalid effect "${fx}".\n\n If this string represents a function to be executed,\n please specify "allowArbitraryFxExecution" as "true".\n`,
      code: 2,
    };
  }
};

export default (
  {
    strict = true,
    allowArbitraryFxExecution = false,
  }: ArmariosPaginaCoreOptions,
  fxList: TemplateSchemaSource['preFx'],
  target: Jimp,
) => {
  fxList?.forEach((fx) => {
    if (typeof fx === 'string') {
      if (allowArbitraryFxExecution) {
        const parsedFx = new Function(fx);
        return parsedFx.apply(target);
      }

      return validate(strict, assertions.arbitraryFxExecution, fx);
    } else {
      const [effectName, effectArgs] = fx;
      target[effectName](...effectArgs);
    }
  });
};
