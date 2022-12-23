const {allFavPlace} = require('./schemas')

async function request(fastify, options){
    const client = fastify.db.client

    fastify.get('/:query', {schema: allFavPlace}, async function (request,reply){
        try {
            await client.query('SELECT * FROM public.test')
            console.log(request.rows)
            reply.send(request.rows)
        } catch(err) {
            throw new Error(err)
        }
    })
}
module.exports = request