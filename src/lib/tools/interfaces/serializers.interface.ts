export interface Serializers {
  toJSON(replacer?: (key: string, value: any) => any): string;
  toXML(): string;
  toCSV(delimiter?: string, quotes?: boolean): string;
  toYAML(): string;
}
