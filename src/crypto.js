import CryptoJS from 'crypto-js'

const generateKey = (n) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const key = [...Array(n)].reduce(
    (acc) => (acc += chars[Math.floor(Math.random() * chars.length)]),
    []
  )

  return key
}

// Encrypt
const encrypt = (message) => {
  const key = generateKey(16)
  const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString()

  return {
    message: encryptedMessage,
    key
  }
}

// Decrypt
const decrypt = (message, key) =>
  CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8)

const exports = { encrypt, decrypt }

export default exports
