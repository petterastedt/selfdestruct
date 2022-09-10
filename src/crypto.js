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

  let invalidCharacters = []

  for (let i = 0; i < encryptedString.length; i++) {
    if (encryptedString[i] === encryptedString[i].match(regExAlgo)[0]) {
      invalidCharacters.push(encryptedString[i])
    }
  }

  if (invalidCharacters.length) {
    return false
  }

  return encryptedString
}

const exports = { encrypt, decrypt }

export default exports
