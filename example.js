'use string'

const helpers = require('./helpers')

const text = 'Encrypt text'
const privateKey = './publicKey.pem'
const publicKey = './privateKey.pem'

const res = helpers.encryptStringWithRsaPublicKey(text, publicKey)
console.log('res: ', res)
const dec = helpers.decryptStringWithRsaPrivateKey(res, privateKey)
console.log('dec: ', dec)
