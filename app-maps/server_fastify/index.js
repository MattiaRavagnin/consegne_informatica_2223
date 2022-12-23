const fastify = require('fastify')({
    logger: true
  })
const cors = require('@fastify/cors')
const db = require('./routes/db')

const PORT = 3000

fastify.register(cors)


//routes
fastify.register(require('./routes/getGeocoding'), { prefix: '/api/search' })
fastify.register(require('./routes/db'))

const start = async () => {
    try {
      await fastify.listen({ port: PORT })
      console.log(`server started on port: ${PORT}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()