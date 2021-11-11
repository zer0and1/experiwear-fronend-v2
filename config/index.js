const isProd = process.env.CONFIG_ENV === 'production'

const PROXY_URL = isProd ? 'https://hawks.experiwear.com/api' : 'https://hawks-dev.experiwear.com/api'
const SOCKET_URL = isProd ? 'https://hawks.experiwear.com/api' : 'https://hawks-dev.experiwear.com/api'

export {
  PROXY_URL,
  SOCKET_URL
}
