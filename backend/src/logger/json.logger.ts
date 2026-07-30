import { LoggerService } from '@nestjs/common';

import { serializeLogValue } from './structured-logger.utils';

export class JsonLogger implements LoggerService {
  log(message: unknown, ...optionalParams: unknown[]): void {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    console.debug(this.formatMessage('verbose', message, optionalParams));
  }

  fatal(message: unknown, ...optionalParams: unknown[]): void {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }

  private formatMessage(
    level: string,
    message: unknown,
    optionalParams: unknown[],
  ): string {
    return JSON.stringify({
      level,
      message: serializeLogValue(message),
      ...(optionalParams.length > 0
        ? { optionalParams: optionalParams.map(serializeLogValue) }
        : {}),
      timestamp: new Date().toISOString(),
    });
  }
}
