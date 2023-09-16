export interface SystemContext {
  readonly environment: string;
  readonly nodeVersion: string;
  readonly hostname: string;
  readonly cpuArch: string;
  readonly osType: string;
  readonly osRelease: string;
  readonly systemUptime: number;

  setEnvironment(environment: string): this;
  refreshSystemInfo(): this;
}
