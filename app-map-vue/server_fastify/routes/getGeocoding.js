const url = require('url')
const axios = require('axios')
require('dotenv').config()

TOKEN = "pk.eyJ1IjoibWF0dGlhcmF2YWduaW45OSIsImEiOiJjbGFmc2w4aTgwb2ZmM3JwcXF6Mzg3NXhsIn0.gZ_Rxa5VLS6ei_wXvRrgeQ"

async function routes (fastify, options) {

    fastify.get('/:query', async (req, res) => {

        try{
           //api token & query strings (for working query)
           const params = new URLSearchParams({
               //access_token: access.env.TOKEN, //request token from .env file TODO: fix
               access_token: TOKEN,
               ...url.parse(req.url, true).query
           })
   
           const query = req.params.query
           const results = await axios(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}` 
           )
           const data = results.data

           res.send(data)
   
        }catch(err){
            res.status(500).json({error: err})
        }
   })
}

module.exports = routes;