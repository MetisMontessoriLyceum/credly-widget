export function parseImageURL (imageURL) {
  const URLParts = imageURL.split('.')
  URLParts[3] = URLParts[3] + '_13'
  return URLParts.join('.')
}

export function parseText (text) {
  return new window.DOMParser()
    .parseFromString(text, 'text/html').documentElement.textContent
}
