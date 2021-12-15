'use strict'

const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const readFile = (filePath) => {
  const absolutePath = path.resolve(filePath)
  return fs.readFileSync(absolutePath, 'utf8')
}

const fileExists = (filePath) => {
  const absolutePath = path.resolve(filePath)
  try {
    if (fs.existsSync(absolutePath)) {
      return true
    }
  } catch (e) {
    return false
  }
}

const encryptStringToBase64 = (toEncrypt, publicKey) => {
  const buffer = Buffer.from(toEncrypt)
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

const decryptBase64String = (toDecrypt, privateKey, passphrase) => {
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decryptKey = (passphrase)
    ? { key: privateKey, passphrase: 'top secret' }
    : privateKey
  const decrypted = crypto.privateDecrypt(decryptKey, buffer)
  return decrypted.toString('utf8')
}

module.exports = {
  fileExists,
  readFile,
  encryptStringToBase64,
  decryptBase64String
}
