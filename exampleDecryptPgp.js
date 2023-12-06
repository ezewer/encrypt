'use strict'

const openpgp = require('openpgp')
const helpers = require('./helpers')

async function example () {
  // put keys in backtick (``) to avoid errors caused by spaces or tabs
  // This is an example with no sensitive information
  const publicKeyArmored = helpers.readFile('./publicPGPKey.pem')
  const privateKeyArmored = helpers.readFile('./privatePGPKey.pem')
  const passphrase = 'something' // what the private key is encrypted with

  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })

  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  })

  const encrypted = helpers.readFile('./exampleEncryptedMessage.pem')

  const message = await openpgp.readMessage({
    armoredMessage: encrypted // parse armored message
  })
  const { data: decrypted, signatures } = await openpgp.decrypt({
    message,
    verificationKeys: publicKey, // optional
    decryptionKeys: privateKey
  })
  console.log(decrypted)
  console.log(signatures)
  // check signature validity (signed messages only)
  try {
    await signatures[0].verified // throws on invalid signature
    console.log('Signature is valid')
  } catch (e) {
    throw new Error('Signature could not be verified: ' + e.message)
  }
}
example()
