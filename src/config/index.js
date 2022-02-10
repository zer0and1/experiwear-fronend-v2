export const IS_PRODUCT = process.env.CONFIG_ENV === 'production';
export const PROXY_URL = IS_PRODUCT
  ? 'https://hawks.experiwear.com/api'
  : 'https://hawks-dev.experiwear.com/api';
export const SOCKET_URL = IS_PRODUCT
  ? 'https://hawks.experiwear.com/api'
  : 'https://hawks-dev.experiwear.com/api';

export const COOKIE_NAME = 'fan_sid';
export const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
