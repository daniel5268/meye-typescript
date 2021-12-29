import { logger } from '../../src/infrastructure';

describe('Infrastructure unit test', () => {
  describe('logger', () => {
    it('it should log correctly', () => {
        logger.info('test');
        logger.error('test');
        logger.warn('test');
        logger.debug('test');
    });
  });
});
