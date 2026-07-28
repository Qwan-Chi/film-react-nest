import { LoggerService } from '@nestjs/common';

import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export function createLogger(format: string): LoggerService {
  switch (format.toLowerCase()) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default:
      return new DevLogger();
  }
}
