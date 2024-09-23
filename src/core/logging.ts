// logging.ts

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export function getLogLevelFromEnv(): LogLevel {
  const envLogLevel = Deno.env.get('LOG_LEVEL')?.toUpperCase();
  switch (envLogLevel) {
    case 'DEBUG':
      return LogLevel.DEBUG;
    case 'INFO':
      return LogLevel.INFO;
    case 'WARN':
      return LogLevel.WARN;
    case 'ERROR':
      return LogLevel.ERROR;
    default:
      return LogLevel.INFO; // Default to INFO if not set or invalid
  }
}
