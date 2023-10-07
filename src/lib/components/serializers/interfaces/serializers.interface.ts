import { JsonReplacer } from '../../../shared/types';

export interface SerializersInterface {
  toJSON(replacer?: JsonReplacer): string;
  toXML(): string;
  toCSV(delimiter?: string, quotes?: boolean): string;
  toYAML(): string;
}
