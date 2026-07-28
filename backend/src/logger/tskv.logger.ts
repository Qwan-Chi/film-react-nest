import { LoggerService } from '@nestjs/common';

import { serializeLogValue } from './structured-logger.utils';

export class TskvLogger implements LoggerService {
  log(message: unknown, ...optionalParams: unknown[]): void {
    process.stdout.write(this.formatMessage('log', message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    process.stderr.write(this.formatMessage('error', message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    process.stderr.write(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    process.stdout.write(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    process.stdout.write(
      this.formatMessage('verbose', message, optionalParams),
    );
  }

  fatal(message: unknown, ...optionalParams: unknown[]): void {
    process.stderr.write(this.formatMessage('fatal', message, optionalParams));
  }

  private formatMessage(
    level: string,
    message: unknown,
    optionalParams: unknown[],
  ): string {
    const fields = [
      ['level', level],
      ['message', serializeLogValue(message)],
      ['timestamp', new Date().toISOString()],
    ];

    optionalParams.forEach((parameter, index) => {
      fields.push([`optionalParam${index + 1}`, serializeLogValue(parameter)]);
    });

    return `${fields
      .map(([key, value]) => `${key}=${this.escape(value)}`)
      .join('\t')}\n`;
  }

  private escape(value: string): string {
    return value
      .replaceAll('\\', '\\\\')
      .replaceAll('\t', '\\t')
      .replaceAll('\r', '\\r')
      .replaceAll('\n', '\\n');
  }
}
