// Get access token at https://account.mapbox.com.
mapboxgl.accessToken = 'pk.eyJ1IjoicnlhbmJsb3VudC0yIiwiYSI6ImNsMW1uZWx1YjAydGIzY205OXIxbDJ4bGYifQ.P-utZatLu35Br-uYeBQVVw';

// Define GeoJSON data.
const geojson = {
   type: 'FeatureCollection',
   features: [
      {
         type: 'Feature',
         geometry: {type: 'Point', coordinates: [-71.091542, 42.358862]},
         properties: {title: 'Bus 1', description: 'Bus Route Between MIT & Harvard'}
      }
   ]
};

// Access the Mapbox API.
let map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [-71.091542, 42.358862],
   zoom: 12
});

// Add markers to the map (just one).
for (const feature of geojson.features) {
   // Create an HTML element for each feature (just one)
   const bus = document.createElement('div');
   bus.className = 'marker';

   // Make a marker for each feature and add it to the map (just one).
   new mapboxgl.Marker(bus)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
         // Add popups (just one)
         new mapboxgl.Popup({offset: 25})
            .setHTML(
               '<h3>' + feature.properties.title + '</h3>' +
               '<p>' + feature.properties.description + '</p>'
            )
      )
      .addTo(map);
}

async function getBusLocations() {
   const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
   const response = await fetch(url);
   const json = await response.json();
   let coordinates = { 'lng': json.data[0].attributes.longitude, 'lat': json.data[0].attributes.latitude };
   console.log(coordinates);
   return coordinates;
}

async function run() {
   let locations = await getBusLocations();
   console.log(new Date());
   console.log(locations);
   marker.setLngLat(locations);
}

async function move() {
   setTimeout(() => {
      run();
      move();
   }, 20000);
}

move();
