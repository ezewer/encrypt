'use strict'

const { generateKeyPair } = require('crypto')
const fs = require('fs')

generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
}, (err, publicKey, privateKey) => {
  if (err) throw (err)
  fs.writeFileSync('./publicKey.pem', publicKey, 'utf8')
  fs.writeFileSync('./privateKey.pem', privateKey, 'utf8')
})
