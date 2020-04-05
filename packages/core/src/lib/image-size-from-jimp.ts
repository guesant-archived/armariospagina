import Jimp from 'jimp';

export default (image: Jimp): [number, number] => {
  const {
    bitmap: { width, height },
  } = image;

  return [width, height];
};
