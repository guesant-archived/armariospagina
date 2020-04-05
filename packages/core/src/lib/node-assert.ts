import { ArmariosPaginaCoreOptions } from '../types';

export const validate = (strict: boolean, assertion: any, ...args: any[]) => {
  const res = assertion(...args);

  if (strict) {
    if (res.code === 1) {
      console.info('[info] Strict mode is set to "true"')
      console.error(`[!]${res.message}`);
      process.exit();
    }

    if (res.message) {
      console.log(res.message);
    }
  }

  return res;
};

export const generateValidator = ({ strict = true }: ArmariosPaginaCoreOptions) => {
  return validate.bind(undefined, strict);
};
