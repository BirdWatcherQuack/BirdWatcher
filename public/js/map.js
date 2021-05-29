var myOttawaMap = L.map('mapid').setView([45.422, -75.697], 12);

const mapTileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

const attribution =
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`

const openMapSetup = L.tileLayer(mapTileUrl, { attribution });
openMapSetup.addTo(myOttawaMap)

myOttawaMap.on('click', onMapClick);

function onMapClick(e) {
  const lat = parseFloat(e.latlng.lat)
  const long = parseFloat(e.latlng.lng)
  // console.log(lat, long)
  document.getElementById('lat-long-input').value = `${lat.toFixed(6)}, ${long.toFixed(6)}`

  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${lat.toFixed(4)}, ${long.toFixed(4)}. \n Updating your coordinates!`)
    .openOn(myOttawaMap);

  // function addMarker(x, y) {
  //     var marker = L.marker([x, y]).addTo(myOttawaMap);
  //     document.getElementById("text").textContent = `${x},${y}`
  // }

  // myOttawaMap.on('click', addMarker(lat, long))
}

const birdList = [
    "Mourning doves",
    "Barred owl",
    "Ruby-throated hummingbird",
    "Bald Eagle",
    "Snowy Owl",
    "Great crested flycatcher",
    "Pileated woodpecker",
    "Canada goose",
    "Mallards",
    "Mute Swan",
    "Tree swallow",
    "Black Duck",
    "Yellow-bellied sapsucker",
    "House sparrow",
    "Sandhill cranes",
    "Ruby-crowned kinglet",
    "Green-winged teal",
    "Trumpeter swans",
    "Wood Duck",
    "Long-eared owl",
]

$("#bird-type").autocomplete({
  source: birdList,
  delay: 200,
  minLength: 1
});

document.getElementById("submitButton").addEventListener("click", function () {
  const birdType = document.getElementById("bird-type").value
  // console.log(birdType)
  const latLongSubmit = document.getElementById("lat-long-input").value
  // console.log(latLongSubmit)

  const dataPackage = {
    bird: birdType,
    sighting: latLongSubmit
  }

  console.log(dataPackage)
})

// //hide view map link when in full page mode
// function myFunction() {
//   document.getElementById("viewMap").style.display = "none";
// }