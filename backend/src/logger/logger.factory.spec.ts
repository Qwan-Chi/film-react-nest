import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { createLogger } from './logger.factory';
import { TskvLogger } from './tskv.logger';

describe('createLogger', () => {
  it.each([
    ['dev', DevLogger],
    ['json', JsonLogger],
    ['tskv', TskvLogger],
  ])('creates %s logger', (format, LoggerClass) => {
    expect(createLogger(format)).toBeInstanceOf(LoggerClass);
  });

  it('warns and falls back to DevLogger for an unknown format', () => {
    const warnSpy = jest
      .spyOn(DevLogger.prototype, 'warn')
      .mockImplementation(() => undefined);

    expect(createLogger('jsno')).toBeInstanceOf(DevLogger);
    expect(warnSpy).toHaveBeenCalledWith(
      'Unknown LOGGER_FORMAT "jsno". Falling back to "dev".',
      'LoggerFactory',
    );

    warnSpy.mockRestore();
  });
});
