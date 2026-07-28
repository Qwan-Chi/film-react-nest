import { ValueTransformer } from 'typeorm';

export const textArrayTransformer: ValueTransformer = {
  to: (value?: string[]): string => value?.join(',') ?? '',
  from: (value?: string): string[] =>
    value
      ? value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
};
