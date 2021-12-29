const { PORT = 3000, LOG_LEVEL = 'debug' } = process.env;

const api = {
  PORT,
  LOG_LEVEL,
  API_NAME: 'meye-typescript',
};

const config = {
  api,
};

export default config;
export { api };
