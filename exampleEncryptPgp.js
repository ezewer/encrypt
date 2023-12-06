'use strict'

const openpgp = require('openpgp')
const fs = require('fs')
const helpers = require('./helpers')
const publicKeyArmored = helpers.readFile('./publicPGPKey.pem')
const text = `
  Here we can set a text to encypt as an example
  With several lines
`
async function test () {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text }), // input as Message object
    encryptionKeys: publicKey
  })
  console.log(encrypted)
  fs.writeFileSync('./exampleEncryptedMessage.pem', encrypted, 'utf8')
}
test()
