import Jimp from 'jimp';

export default async (options: Jimp | string | any): Promise<Jimp> => {
  if (options instanceof Jimp) {
    return options;
  }

  if (typeof options === 'string') {
    return Jimp.read(options);
  }

  return new Jimp(...options);
};
