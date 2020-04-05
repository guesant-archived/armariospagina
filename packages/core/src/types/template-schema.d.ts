import Jimp from 'jimp/*';
import { BlendMode } from '@jimp/core/types/etc';

export interface TemplateSchema {
  base: string;
  mask?: string;
  sources: TemplateSchemaSource[];
}

export interface TemplateSchemaSource {
  compose: TemplateSchemaSourceCompose;
  preFx?: [[string, any[]] | string];
  postFx?: [[string, any[]] | string];
}

export interface TemplateSchemaSourceCompose {
  mask?: string | Jimp;
  start: [number, number];
  end: [number, number];
  blendMode?: BlendMode;
  fillmode: 'resize' | 'contain' | 'cover';
}
