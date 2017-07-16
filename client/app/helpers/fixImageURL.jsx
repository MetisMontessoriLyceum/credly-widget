export default function fixImageURL (imageURL) {
  const URLParts = imageURL.split('.')
  URLParts[3] = URLParts[3] + '_13'
  return URLParts.join('.')
}
