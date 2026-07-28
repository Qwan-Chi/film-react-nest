import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  const logger = new JsonLogger();

  afterEach(() => jest.restoreAllMocks());

  it('writes a valid JSON record with log context', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    logger.log('application started', { port: 3000 });

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const record = JSON.parse(consoleSpy.mock.calls[0][0] as string) as {
      level: string;
      message: string;
      optionalParams: string[];
      timestamp: string;
    };
    expect(record).toMatchObject({
      level: 'log',
      message: 'application started',
      optionalParams: ['{"port":3000}'],
    });
    expect(new Date(record.timestamp).toISOString()).toBe(record.timestamp);
  });

  it('uses the matching console method for errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('database unavailable');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level":"error"'),
    );
  });
});
