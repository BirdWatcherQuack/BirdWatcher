var myOttawaMap = L.map('mapid').setView([45.422, -75.697], 12);

const mapTileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

const attribution =
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`

const openMapSetup = L.tileLayer(mapTileUrl, { attribution });
openMapSetup.addTo(myOttawaMap)

myOttawaMap.on('click', onMapClick);

function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
  const lat = parseFloat(e.latlng.lat)
  const long = parseFloat(e.latlng.lng)

  console.log(lat, long)

  document.getElementById('text-input').value = `${lat}, ${long}`

  function addMarker(x, y) {
    var marker = L.marker([x, y]).addTo(myOttawaMap);
    document.getElementById("text").textContent = `${x},${y}`
  }

  myOttawaMap.on('click', addMarker(lat, long))
};