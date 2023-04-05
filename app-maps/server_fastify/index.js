const fastify = require('fastify')({
    logger: true
  })
const cors = require('@fastify/cors')
//const db = require('./routes/db')
const postgres = require('@fastify/postgres')
const uuid = require('uuid')

const axios = require('axios')

const PORT = 3000

const tokenCreate = 'sk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGZ0bTJveTkwMmE0M3NwaWMwNDl2bmEwIn0.rB5tWd3C1N-O-BL7vQ60Xw'


fastify.register(cors,{origin:true})

//routes
fastify.register(require('./routes/getGeocoding'), { prefix: '/api/search' })

fastify.register(postgres,{
  connectionString: `postgresql://postgres:password@localhost/favlistmap_db`
  //postgresql://{role}:{password}@{indirizzo}/{namedb}
})

//pass token dentro un JVT e salvare nei cookies
fastify.get('/getToken', async (request, reply) => {

  //TODO: token expire
  //token with expire
  // axios.post(`https://api.mapbox.com/tokens/v2/mattiaravagnin99?access_token=${tokenCreate}`,
  // {
  //   "expires": "2016-09-15T19:27:53.000Z", //indietro di 2h 
  //   "scopes": ["styles:read", "fonts:read"]
  // }
  // )

  await axios.post(`https://api.mapbox.com/tokens/v2/mattiaravagnin99?access_token=${tokenCreate}`,
    {
      "scopes": ["styles:read", "fonts:read"]
    }
  ).then( (response) => {
    reply.send(response.data)
    
  })

  

})


fastify.post('/addFavPlace', async (request, reply) =>{
  let place = {
    locality: request.body.data.locality,
    city: request.body.data.city,
    region: request.body.data.region,
    country: request.body.data.country,
    lat: request.body.data.lat,
    lng: request.body.data.lng
  }

  var id_place = uuid.v4()
  var id_coords = uuid.v4()


  await fastify.pg.query(
    'INSERT INTO place(id_place,locality,city,region,country) VALUES ($1,$2,$3,$4,$5);',
    [id_place,place.locality,place.city,place.region,place.country],
    function onResult(err,result){
      return {msg:err || result}
    }
  )
  await fastify.pg.query(
    'INSERT INTO coords(id_coords,lat,lng,id_place) VALUES ($1,$2,$3,$4);',
    [id_coords,place.lat,place.lng,id_place],
    function onResult(err,result){
      return {msg:err || result}
    }
  )

})

fastify.get('/getFavList', async (request, reply) => {

  let { rows } = await fastify.pg.query(
    'SELECT * FROM place'
  )
  reply.send(rows)

})

fastify.get('/getCoords/:id_place', async (request, reply) => {

  let { rows } = await fastify.pg.query(
    'SELECT lat,lng FROM coords WHERE id_place = $1',
    [request.params.id_place]
  )
  console.log(rows)
  reply.send(rows)

})

fastify.delete('/removePlace/:id_place', async (request, reply) => {
  await fastify.pg.query(
    'DELETE FROM coords WHERE id_place = $1',
    [request.params.id_place]
  )
  
  await fastify.pg.query(
    'DELETE FROM place WHERE id_place = $1',
    [request.params.id_place]
  )

  console.log('SIUM')
})

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