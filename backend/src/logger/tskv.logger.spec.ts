import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  const logger = new TskvLogger();

  afterEach(() => jest.restoreAllMocks());

  it('writes tab-separated key-value fields and ends with a newline', () => {
    const writeSpy = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);

    logger.log('application started', { port: 3000 });

    const record = writeSpy.mock.calls[0][0] as string;
    expect(record).toMatch(
      /^level=log\tmessage=application started\ttimestamp=/,
    );
    expect(record).toContain('\toptionalParam1={"port":3000}');
    expect(record.endsWith('\n')).toBe(true);
  });

  it('escapes control characters to preserve one record per line', () => {
    const writeSpy = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);

    logger.warn('first\tcolumn\nsecond line');

    const record = writeSpy.mock.calls[0][0] as string;
    expect(record).toContain('message=first\\tcolumn\\nsecond line');
    expect(record.match(/\n/g)).toHaveLength(1);
  });
});
