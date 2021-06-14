const newBirdType = document.getElementById("bird_type")
const newBirdName = document.getElementById("bird_name")
const newLatinName = document.getElementById("latin_name")
const newMaxAge = document.getElementById("max_age")
const newAvgWeight = document.getElementById("av_weight")
const newDescription = document.getElementById("description")
const newCreate = document.getElementById("create")

newCreate.addEventListener("click", function (event) {

  event.preventDefault();
  const nbt = newBirdType.value
  const nbn = newBirdName.value
  const nln = newLatinName.value
  const nma = newMaxAge.value
  const naw = newAvgWeight.value
  const ndes = newDescription.value

  let newBirdTypeEntry = nbt.charAt(0).toUpperCase() + nbt.slice(1)
  let newBirdNameEntry = nbn.charAt(0).toUpperCase() + nbn.slice(1)
  let newLatinNameEntry = nln.charAt(0).toUpperCase() + nln.slice(1)
  let newDescriptionEntry = ndes.charAt(0).toUpperCase() + ndes.slice(1)

  if (nbt.length < 2 || typeof nbt != 'string') return alert("Failed to add new bird. 'Bird Type' incomplete!")
  if (nbn.length < 2 || typeof nbn != 'string') return alert("Failed to add new bird. 'Bird Name' incomplete!")
  if (nln.length < 2 || typeof nln != 'string') return alert("Failed to add new bird. 'Latin Name' incomplete!")
  if (!nma || nma < 0) return alert("Failed to add new bird. 'Maximum age' not an accepted number!")
  if (!naw || naw < 1) return alert("Failed to add new bird. 'Average weight' not an accepted number!")
  if (nln.length < 2 || typeof nln != 'string') alert("Failed to add new bird. 'Description' incomplete!")

  fetch('/api/birds/names', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let birdNameArray = []
      for (let i = 0; i < data.length; i++) {
        let birdName = data[i][0];
        birdNameArray.push(birdName)
        if (newBirdNameEntry === birdName) {
          return alert("This bird already exists in our database. Please submit a unique bird.")
        }
      }

      newBirdPostMethod()

    })
    .catch((error) => {
      console.error('Error:', error);
    });

  function newBirdPostMethod() {
    const newDataPackage = {
      bird_type: newBirdTypeEntry,
      bird_name: newBirdNameEntry,
      latin_name: newLatinNameEntry,
      max_age: newMaxAge.value,
      weight: newAvgWeight.value,
      description: newDescriptionEntry
    }
    console.log(newDataPackage)
    fetch('/api/birds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDataPackage),
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        if (data) {
          alert('Yay! Your bird has been submitted!');
        } else {
          alert('Sorry, your bird has not been submitted');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(newDataPackage)
    window.location.replace(`/map`)
  }
})