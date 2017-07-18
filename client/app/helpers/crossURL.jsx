const debug = require('debug')('credly-widget:api')

export const SCRIPT_URL = document.currentScript.src
export const SCRIPT_HOST = SCRIPT_URL.split('/').slice(0, 3).join('/')
debug(`SCRIPT_HOST: ${SCRIPT_HOST}`)

export function fetch (url, options) {
  debug(url)

  if (url.charAt(0) === '/' && SCRIPT_URL.charAt(0) !== '/') {
    url = SCRIPT_HOST + url
  }

  return window.fetch(url, options)
}
