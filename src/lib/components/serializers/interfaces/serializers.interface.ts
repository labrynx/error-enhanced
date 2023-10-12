import { JsonReplacer } from '../../../shared/types';

/**
 * @interface Serializers
 * @group Utilities
 * @category Serializers
 *
 * @description
 * The Serializers interface defines the contract for classes that need to serialize
 * out in JSON, CSV, XML and YAML.
 *
 */
export interface SerializersInterface {
  toJSON(replacer?: JsonReplacer): string;
  toXML(): string;
  toCSV(delimiter?: string, quotes?: boolean): string;
  toYAML(): string;
}
