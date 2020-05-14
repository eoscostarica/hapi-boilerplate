const Hapi = require('@hapi/hapi')
const Boom = require('@hapi/boom')
const Path = require('path')

const ipfsClient = require('ipfs-http-client')
const { GraphQLClient } = require('graphql-request')

const routes = require('routes')
const {
  apiConfig,
  ipfsConfig,
  jwtConfig,
  i18nConfig,
  hasuraConfig
} = require('config')

const init = async () => {
  const server = Hapi.server({
    port: apiConfig.port,
    host: apiConfig.host,
    routes: {
      cors: { origin: ['*'] },
      validate: {
        failAction: async (request, h, err) => {
          if (process.env.NODE_ENV === 'production') {
            throw Boom.badRequest(`Invalid request payload input`)
          } else {
            throw err
          }
        }
      },
      files: {
        relativeTo: Path.join(__dirname, 'files')
      }
    }
  })

  server.bind({
    ipfs: ipfsClient({
      host: ipfsConfig.host,
      port: ipfsConfig.port,
      protocol: ipfsConfig.protocol
    }),
    i18n: i18nConfig,
    hasuraClient: new GraphQLClient(hasuraConfig.url, {
      headers: {
        'x-hasura-admin-secret': hasuraConfig.adminSecret
      }
    })
  })

  server.route(routes)

  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: true,
        logEvents: ['request-error']
      }
    },
    {
      plugin: require('hapi-auth-jwt2'),
      options: {}
    },
    {
      plugin: require('@hapi/inert'),
      options: {}
    }
  ])

  server.auth.strategy('jwt', 'jwt', {
    key: jwtConfig.publicKey,
    validate: async () => {
      return {
        isValid: true
      }
    },
    verifyOptions: {
      algorithms: [jwtConfig.algorithm]
    }
  })

  server.auth.default('jwt')

  await server.start()

  console.log(`🚀 Server ready at ${server.info.uri}`)
  server.table().forEach(route => console.log(`${route.method}\t${route.path}`))
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
