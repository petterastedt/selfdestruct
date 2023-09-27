import StringCrypto from 'string-crypto'

const regExAlgo = /([\x00-\x1F\x7F])*/g

const generateKey = (n) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const key = [...Array(n)].reduce(
    (acc) => (acc += chars[Math.floor(Math.random() * chars.length)]),
    []
  )

  return key
}

const encrypt = (message) => {
  const key = generateKey(16)
  const { encryptString } = new StringCrypto()

  const encryptedMessage = encryptString(message.replace(regExAlgo, ''), key)

  return {
    message: encryptedMessage,
    key
  }
}

const decrypt = (message, key) => {
  const { decryptString } = new StringCrypto()

  const encryptedString = decryptString(message, key)

  const invalidCharacters = encryptedString
    .split('')
    .filter((char) => char === char.match(regExAlgo)[0])

  if (invalidCharacters.length) {
    return false
  }

  return encryptedString
}

const exports = { encrypt, decrypt }

export default exports
