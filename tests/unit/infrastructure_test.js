const assert = require('assert');

const infrastructure = require('../../src/infrastructure');

describe('Logger unit tests', () => {
  it('it should correctly init logger', () => {
    try {
      infrastructure.logger.initLogger();
    } catch (_) {
      assert.fail();
    }
  });

  it('it should log correctly', () => {
    try {
      infrastructure.logger.initLogger();
      infrastructure.logger.logger.info('test');
    } catch (_) {
      assert.fail();
    }
  });
});
