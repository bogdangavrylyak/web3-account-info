export interface Config {
  coingecko_api_base_url: string;
}

export default (): Config => {
  const config = {
    coingecko_api_base_url: 'https://api.coingecko.com/api/v3',
  };

  return config;
};
