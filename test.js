const axios = require('axios');

const baseURL = 'http://localhost:3000'; 

async function addLocation(name, longitude, latitude) {
  try {
    const response = await axios.post(`${baseURL}/locations`, { name, longitude, latitude });
    console.log(response.data);
  } catch (err) {
    console.error('Error adding location:', err.response.data);
  }
}

async function findNearbyLocations(longitude, latitude) {
  try {
    const response = await axios.get(`${baseURL}/nearby?longitude=${longitude}&latitude=${latitude}`);
    console.log('Nearby locations:', response.data);
  } catch (err) {
    console.error('Error finding nearby locations:', err.response.data);
  }
}

addLocation('Restaurant A', 29.9755, 31.1313); 
addLocation('Restaurant B', 29.9772, 31.1356);
addLocation('Restaurant C', 29.9809, 31.1287);
findNearbyLocations(29.978, 31.133); 