export interface ApplicationStateInterface {
  readonly environment: string;
  readonly nodeVersion: string;
  readonly stateSnapshot: Record<string, any>;
  readonly eventHistory: string[];
  readonly dependencies: Record<string, string>;
  readonly configurations: Record<string, any>;
  readonly envVars: Record<string, any>;

  addToEventHistory(event: string): this;
  setEnvironment(environment: string): this;
  setConfigurations(configs: Record<string, any>): this;
  setStateSnapshot(snapshot: Record<string, any>): this;
}
