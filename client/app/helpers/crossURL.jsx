export const SCRIPT_URL = document.currentScript.src
export const SCRIPT_HOST = SCRIPT_URL.split('/').slice(0, 3).join('/')

export function fetch (url, options) {
  if (url.charAt(0) === '/' && SCRIPT_URL.charAt(0) !== '/') {
    url = SCRIPT_HOST + url
  }

  return window.fetch(url, options)
}
