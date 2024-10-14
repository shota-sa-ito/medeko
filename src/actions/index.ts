import generateDecoImage from './functions/deco-image/generate-deco-image';
import saveDecoImage from './functions/deco-image/save-deco-image';

export const server = {
  ...generateDecoImage,
  ...saveDecoImage,
};
