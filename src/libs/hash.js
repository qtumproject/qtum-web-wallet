import createHash from 'create-hash'

export function sha256(buffer) {
  return createHash('sha256')
    .update(buffer)
    .digest()
}

export function sha256d(buffer) {
  return sha256(sha256(buffer))
}
