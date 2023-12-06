'use strict'

const openpgp = require('openpgp')
const fs = require('fs')

async function generate () {
  const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
    userIDs: [{ name: 'person', email: 'person@somebody.com' }],
    curve: 'ed25519',
    passphrase: 'something'
  })
  console.log('Private: ')
  console.log(privateKey)
  console.log('Public: ')
  console.log(publicKey)
  console.log('revocationCertificate: ')
  console.log(revocationCertificate)
  fs.writeFileSync('./publicPGPKey.pem', publicKey, 'utf8')
  fs.writeFileSync('./privatePGPKey.pem', privateKey, 'utf8')
  fs.writeFileSync('./revocationCertificate.pem', revocationCertificate, 'utf8')
}
generate()
