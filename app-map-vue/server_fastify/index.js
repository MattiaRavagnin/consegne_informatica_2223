const fastify = require('fastify')({
    logger: true
  })

const PORT = 3000

//routes
fastify.register(require('./routes/getGeocoding'), { prefix: '/api/search' })


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