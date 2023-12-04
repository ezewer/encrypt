'use string'

const helpers = require('./helpers')

const text =  `Some secret text`
const publicKey = helpers.readFile('./publicKey.pem')
const privateKey = helpers.readFile('./privateKey.pem')

const res = helpers.encryptStringToBase64(text, publicKey)
console.log('res: ', res)
const res2 = helpers.decryptBase64String(res, privateKey, 'top secret')
console.log('res: ', res2)
