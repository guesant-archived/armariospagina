import { TemplateSchemaSource } from '../types/template-schema';

export default (model: TemplateSchemaSource): [number, number] => {
  const {
    compose: {
      start: [x1, y1],
      end: [x2, y2],
    },
  } = model;

  return [Math.abs(x1 - x2), Math.abs(y1 - y2)];
};
