import { LoggerService } from '@nestjs/common';

import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export function createLogger(format: string): LoggerService {
  switch (format.toLowerCase()) {
    case 'dev':
      return new DevLogger();
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default: {
      const logger = new DevLogger();
      logger.warn(
        `Unknown LOGGER_FORMAT "${format}". Falling back to "dev".`,
        'LoggerFactory',
      );
      return logger;
    }
  }
}
