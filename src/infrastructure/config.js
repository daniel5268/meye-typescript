const { PORT = 3000, LOG_LEVEL = 'info' } = process.env;

module.exports = {
  api: {
    PORT,
    LOG_LEVEL,
    API_NAME: 'meye-typescript',
  },
};
