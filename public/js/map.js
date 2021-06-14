// Map Creation and Bird Icon 
var myOttawaMap = L.map('mapid').setView([45.422, -75.697], 12);
const mapTileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
const attribution =
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`

const openMapSetup = L.tileLayer(mapTileUrl, { attribution });
openMapSetup.addTo(myOttawaMap)

const birdyIcon = L.icon({
  iconUrl: '../images/birdy.png',
  iconSize: [50, 65], // size of the icon
  iconAnchor: [25, 64], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -58] //  point from which the popup should open relative to the iconAnchor
});

// This differentiates the type of URL (/maps vs /singlebird/:id /home)
const thisUrl = window.location.href
const splitUrl = thisUrl.split('/').reverse()
const identifier = splitUrl[0]
console.log(identifier)

if (identifier === "map") {
  console.log(`This is the ${identifier} page`)
} else if (identifier === "home") {
  console.log(`This is the ${identifier} page`)
  homeBirdsMarkerGenerator()
} else if (identifier === "homeall") {
  console.log(`This is the ${identifier} page`)
  homeBirdsMarkerGenerator()
} else {
  try {
    const idToNum = parseInt(identifier)
    console.log(idToNum)
    console.log(typeof idToNum)
    singleBirdMarkerGenerator(idToNum)
  }
  catch { console.log(`This is the ${identifier} page`) }
}


// for /map 
myOttawaMap.on('click', onMapClick);

function onMapClick(e) {
  const lat = parseFloat(e.latlng.lat)
  const long = parseFloat(e.latlng.lng)
  // console.log(lat, long)
  document.getElementById('lat-long-input').value = `${lat.toFixed(6)}, ${long.toFixed(6)}`

  var popup = L.popup();
  popup
    .setLatLng(e.latlng)

  function addMarker(x, y) {

    popup
      .setLatLng(e.latlng)
      .setContent(`You found this bird at ${e.latlng.toString()}. Updating your coordinates`)
      .openOn(myOttawaMap);
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
    .then((response) => {
      // console.log("back-end route for /api/birds/names", response)
      return response.json()
    })
    .then((data) => {
      // console.log(data)
      let birdNameArray = []
      for (let i = 0; i < data.length; i++) {
        let birdName = data[i][0];
        birdNameArray.push(birdName)
      }
      console.log(birdNameArray)

      $("#bird-type").autocomplete({
        source: birdNameArray,
        delay: 200,
        minLength: 1
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

// Once you click the 'submit' button, the values in the inputs are converted into
// a data object and pushed to '/api/birds/sightings'

document.getElementById("submitButton").addEventListener("click", function () {
  let birdType = document.getElementById("bird-type").value
  let latLongSubmit = document.getElementById("lat-long-input").value

  let dataPackage = {
    bird_name: birdType,
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
      birdType = '';
      latLongSubmit = '';
      return response.json()
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

      fetch('/api/birds/names', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // console.log("back-end route for /api/birds/names", response)
          return response.json()
        })
        .then((datasecond) => {
          // console.log(datasecond)
          const birdToCompare = dataPackage.bird_name
          // console.log(birdToCompare)

          for (let i = 0; i < datasecond.length; i++) {
            let birdName = datasecond[i][0];
            if (birdToCompare === birdName) {
              // console.log(`${birdToCompare} matches ${birdName}`)
              // console.log("birds id is " + datasecond[i][1])
              const birdID = datasecond[i][1]
              window.location.replace(`/singlebird/${birdID}`)
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    })
    .catch((error) => {
      console.error('Error:', error);
    });
});



// for /home
function homeBirdsMarkerGenerator() {
  const birdDiv = document.getElementsByClassName("bird-card")
  const birdDataIds = []

  // loop to extract the data-birdid for each `bird-card` div
  for (let i = 0; i < birdDiv.length; i++) {
    let indBirdId = birdDiv[i].dataset.birdid
    // console.log(indBirdId)
    birdDataIds.push(indBirdId)
  }

  // loop to run a separate API call for the data values
  for (let j = 0; j < birdDataIds.length; j++) {
    // console.log("This page has loaded")
    fetch(`/api/birds/sightings/${birdDataIds[j]}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        let coordinates = data.coordinates
        for (let i = 0; i < coordinates.length; i++) {
          splitCoor = coordinates[i].split(", ")
          const x = splitCoor[0]
          const y = splitCoor[1]

          L.marker([x, y], { icon: birdyIcon }).addTo(myOttawaMap).bindPopup(`<b>${data.bird_name}</b><br>
          Caught in the act at ${x}, ${y}.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}


// for /singlebird/:id
function singleBirdMarkerGenerator(idNum) {

  document.addEventListener("DOMContentLoaded", function () {

    fetch(`/api/birds/sightings/${idNum}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // for /api/birds/sightings", response)
        return response.json()
      })
      .then((data) => {
        console.log(data)
        let coordinates = data.coordinates
        for (let i = 0; i < coordinates.length; i++) {
          console.log(coordinates[i])
          splitCoor = coordinates[i].split(", ")
          console.log(splitCoor)
          const x = splitCoor[0]
          const y = splitCoor[1]
          console.log(x)
          console.log(y)

          L.marker([x, y], { icon: birdyIcon }).addTo(myOttawaMap).bindPopup(`<b>${data.bird_name}</b><br>
          Caught in the act at ${x}, ${y}.`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  })
}
