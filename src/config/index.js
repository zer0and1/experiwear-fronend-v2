export const IS_PRODUCT = process.env.CONFIG_ENV === 'production';
export const PROXY_URL = IS_PRODUCT
  ? 'https://hawks.api.experiwear.com/'
  : 'https://hawks-dev.api.experiwear.com/api/';

export const SOCKET_URL = IS_PRODUCT
  ? 'https://hawks.api.experiwear.com/users'
  : 'https://hawks-dev.api.experiwear.com/users';

export const COOKIE_NAME = 'fan_sid';
export const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
