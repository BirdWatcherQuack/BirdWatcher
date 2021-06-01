var myOttawaMap = L.map('mapid').setView([45.422, -75.697], 12);

const mapTileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

const attribution =
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`

const openMapSetup = L.tileLayer(mapTileUrl, { attribution });
openMapSetup.addTo(myOttawaMap)

//marker fo the map


myOttawaMap.on('click', onMapClick);

function onMapClick(e) {
  const lat = parseFloat(e.latlng.lat)
  const long = parseFloat(e.latlng.lng)
  // console.log(lat, long)
  document.getElementById('lat-long-input').value = `${lat.toFixed(6)}, ${long.toFixed(6)}`

  var popup = L.popup();
  popup
    .setLatLng(e.latlng)
  // .setContent(`Busted at ${lat.toFixed(4)}, ${long.toFixed(4)}. \n `)
  // .openOn(myOttawaMap);

  function addMarker(x, y) {

    popup
        .setLatLng(e.latlng)
        .setContent(`You found this bird at ${e.latlng.toString()}. Updating your coordinates`)
        .openOn(myOttawaMap);

    // const birdyIcon = L.icon({
    //   iconUrl: 'images/birdy.png',
    //   iconSize: [50, 65], // size of the icon
    //   iconAnchor: [25, 64], // point of the icon which will correspond to marker's location
    //   popupAnchor: [0, -58] //  point from which the popup should open relative to the iconAnchor

    // });
    // L.marker([x, y], { icon: birdyIcon }).addTo(myOttawaMap).bindPopup(`Busted at ${lat.toFixed(4)}, ${long.toFixed(4)}. \n `);
    // var marker = L.marker([x, y]).addTo(myOttawaMap);
    // document.getElementById("text").textContent = `${x},${y}`
  }

  myOttawaMap.on('click', addMarker(lat, long))
}

// When the page loads, grab the full list of bird names from API (array)
document.addEventListener("DOMContentLoaded", function () {
  fetch('/api/birds/names', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => console.log("back-end route for /api/birds/names", response))
    .catch((error) => {
      console.error('Error:', error);
    });
});


// A pre-written list of birds. We are trying to replace this with /api/birds/names
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

// The autocomplete feature; we will replace the 'source' with the results of the API call 
$("#bird-type").autocomplete({
  source: birdList,
  delay: 200,
  minLength: 1
});

// Once you click the 'submit' button, the values in the inputs are converted into
// a data object and pushed to '/api/birds/sightings'

document.getElementById("submitButton").addEventListener("click", function () {
  let birdType = document.getElementById("bird-type").value
  let latLongSubmit = document.getElementById("lat-long-input").value

  let dataPackage = {
    bird_name: birdType,
    user_id: 1,
    coordinates: latLongSubmit
  }

  // api/birds/
  fetch('/api/birds/sightings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataPackage),
  })
    .then((response) => {
      console.log("front-end response.json() call", response.json())
      birdType = '';
      latLongSubmit = '';
    })
    .then((data) => {
      if (data) {
        alert('Yay! Your bird has been submitted!');
      } else {
        alert('Sorry, your bird has not been submitted');  
      }
      // clear the form
      birdType = '';
      latLongSubmit = '';
      console.log("client-side data meant to be submitted to back-end", dataPackage)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});





// //hide view map link when in full page mode
// function myFunction() {
//   document.getElementById("viewMap").style.display = "none";
// }