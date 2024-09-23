// utils.ts
import { ensureFileSync } from '$std/fs/ensure_file.ts';
import { writeAllSync } from '$std/io/mod.ts';
import { LogLevel } from './logging.ts';
import { config } from './config.ts';

let logFile: Deno.FsFile | null = null;
let errorFile: Deno.FsFile | null = null;

export function initLogs() {
  // Ensure log files exist and open them in write mode (which will truncate existing content)
  ensureFileSync('logs.txt');
  ensureFileSync('errors.txt');
  logFile = Deno.openSync('logs.txt', {
    write: true,
    truncate: true,
    create: true,
  });
  errorFile = Deno.openSync('errors.txt', {
    write: true,
    truncate: true,
    create: true,
  });
}

export function closeLogs() {
  logFile?.close();
  errorFile?.close();
}

// Unified log message function that also sends data to Baselime
export async function log(
  level: LogLevel,
  message: string,
  error?: string,
): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const formattedMessage = `${timestamp} [${LogLevel[level]}]: ${message}\n`;

  // Console logging
  if (level >= config.minLogLevel) {
    console.log(formattedMessage.trim());
  }

  // File logging
  if (logFile) {
    try {
      writeAllSync(logFile, new TextEncoder().encode(formattedMessage));
    } catch (err) {
      console.error('Error writing to log file:', err);
    }
  }

  // Error logging
  if (level === LogLevel.ERROR) {
    const errorMessage = `${timestamp} [ERROR]: ${message}${error ? '\n' + error : ''}\n`;
    console.error(errorMessage.trim());
    if (errorFile) {
      try {
        writeAllSync(errorFile, new TextEncoder().encode(errorMessage));
      } catch (err) {
        console.error('Error writing to error file:', err);
      }
    }
  }

  // Production logging (e.g., Baselime)
  if (config.isProd) {
    try {
      const logEvent = {
        message: message,
        level: LogLevel[level],
        timestamp: timestamp,
        ...(error && { error: error }),
      };

      const response = await fetch('https://events.baselime.io/v1/logs', {
        method: 'POST',
        headers: {
          'x-api-key': config.baselimeApiKey,
          'Content-Type': 'application/json',
          'x-service': 'recipe-crawler-normalizer',
        },
        body: JSON.stringify([logEvent]),
      });

      if (!response.ok) {
        console.error('Failed to send log to Baselime:', await response.text());
        return false;
      }
    } catch (error) {
      console.error('Error sending log to Baselime:', error);
      return false;
    }
  }

  return true;
}
