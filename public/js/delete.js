const deleteButton = document.getElementById("deleteButton")

const selectList = document.getElementById("deleteB")

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
    }
    console.log(birdNameArray)

    for (let j = 0; j < birdNameArray.length; j++) {
      var x = document.createElement("OPTION");
      x.textContent = birdNameArray[j]
      x.value = birdNameArray[j]
      selectList.appendChild(x)

    }

  })
  .catch((error) => {
    console.error('Error:', error);
  });

deleteButton.addEventListener("click", function () {
  let selectedOption = selectList.options[selectList.selectedIndex].value
  console.log(selectedOption)

  fetch('/api/birds/names', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response.json()
    })
    .then((datasecond) => {
      // console.log(datasecond)
      const birdToCompare = selectedOption
      // console.log(birdToCompare)

      for (let i = 0; i < datasecond.length; i++) {
        let birdName = datasecond[i][0];
        if (birdToCompare === birdName) {
          console.log(`${birdToCompare} matches ${birdName}`)
          console.log("birds id is " + datasecond[i][1])
          let birdID = datasecond[i][1]
          deleteThisBird(birdID)
        }
      }

      function deleteThisBird(birdIDToDelete) {
        const confirmMessage = confirm(`Are you sure you'd like to delete '${birdToCompare}' from the database?`)
        console.log("birdIDtoDelete", birdIDToDelete)
        if (!confirmMessage) return
        if (confirmMessage) {
          console.log("You have confirmed")
          fetch(`/api/birds/${birdIDToDelete}`, { // birdID is not referenced?
            method: 'DELETE',
            // body: formData
          }).then(response => {
            return response.json()
          }).then(data => {
            alert(`${birdToCompare} is deleted!`)
            location.reload()
          })
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

})
