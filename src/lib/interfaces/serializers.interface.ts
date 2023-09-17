import { JsonReplacer } from '../types';

export interface Serializers {
  toJSON(replacer?: JsonReplacer): string;
  toXML(): string;
  toCSV(delimiter?: string, quotes?: boolean): string;
  toYAML(): string;
}
