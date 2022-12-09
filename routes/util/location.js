const axios =require('axios')
const HttpError = require('../../models/http-error')



const API_KEY= 'AIzaSyATzBBWEsecVs7Oa4BiTGLIkaScnOhrDYs'

async function getCoordsForAddress(address){
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
  )
  const data = response.data
  if( !data || data.status === 'ZERO_RESULTS'){
  const error = new HttpError('Could not find a location for the specified address.',
   422 
   )
   throw error
  }
  const coordinates = data.results[0].geomatry.location;
  return coordinates;
}
