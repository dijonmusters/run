import jwt from 'jsonwebtoken'
const jwksRsa = require('jwks-rsa')

const {
  AUTH0_CLIENT_ID: aud,
  AUTH0_ISSUER: issuer,
  AUTH0_ALGORITHM: algorithm,
  AUTH0_JWKS_URI: jwksUri,
} = process.env

const options = {
  algorithms: [algorithm],
  issuer,
  aud,
}

const client = jwksRsa({
  jwksUri,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
})

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, getKey, options, (error, user) => {
      if (error) reject(error)
      if (user) resolve(user)
    })
  })

const validateJwt = async ({ req }) => {
  const token = req.headers?.authorization.split(' ')[1]
  return await verify(token)
}

export { validateJwt }
