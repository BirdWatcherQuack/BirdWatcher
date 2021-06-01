const router = require('express').Router();
const { Bird, Location, User } = require('../../models');

// might work in server.js / router
const express = require('express');
const { response } = require('express');
const app = express()

app.use(express.json({ limit: '1mb'}))

// for api/birds/

// ✔️ gets all birds
router.get('/', async (req, res) => {
    try {
      const dbBirdData = await Bird.findAll();

        res.status(200).json(dbBirdData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // ✔️ gets a bird's sightings based on its id
  router.get('/sightings/:id', async (req, res) => {
    try {
          const dbBirdData = await Bird.findByPk(req.params.id);
          const birdSimple = dbBirdData.get({ plain: true })

          const dbSightingsData = await Location.findAll()
          const sightingsPlain = dbSightingsData.map((sight) => sight.get({ plain: true }))

            const birdShipData = {
                id: birdSimple.id,
                bird_name: birdSimple.bird_name,
                coordinates: "N/A"
            }

            const birdCoordinates = []
          for (let i = 0; i < sightingsPlain.length; i++) {
              if (birdSimple.id === sightingsPlain[i].bird_id) {
                birdCoordinates.push(sightingsPlain[i].coordinates)
              } 
          }
          birdShipData.coordinates = birdCoordinates
          console.log(birdCoordinates)
          console.log(birdShipData)

          res.status(200).json(birdShipData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });


// api/birds/
// ✔️  returns an array of bird names from the database
router.get('/names', async (req, res) => {
    try {
        const dbBirdData = await Bird.findAll();
        const birdPlain = dbBirdData.map((bird) => bird.get({ plain: true }))
        const namesList = []
        for (let i = 0; i < birdPlain.length; i++) {
            namesList.push(birdPlain[i].bird_name)
        }
        console.log(namesList)
        res.status(200).json(namesList);
    } catch {
        res.status(500).json(err);
    }
});

// ✔️ gets the bird by its ID
router.get('/:id', async (req, res) => {
try {
    const dbBirdData = await Bird.findByPk(req.params.id);

    if (!dbBirdData) {
    res.status(404).json({ message: 'No bird found with that id!' });
    return;
    }

    res.status(200).json(dbBirdData);
} catch (err) {
    res.status(500).json(err);
}
});

// ✔️ Creates a new bird
router.post('/', async (req, res) => {
    try { 
      const birdData = await Bird.create({
        bird_type: req.body.bird_type,
        bird_name: req.body.bird_name,
        latin_name: req.body.latin_name,
        max_age: req.body.max_age,
        weight: req.body.weight,
        description: req.body.description,
      });
      res.status(200).json(birdData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // NEED HELP ON THIS SECTION
  // api/birds/sightings

  router.post('/sightings', async (req, res) => {
    try { 
        // if (!req.session.user_id) throw err  // KEEP THIS

        console.log("req.body", req.body)
        
        // Pulls up all birds and filters to the single bird whose req.body's bird_name matches
        // the bird_name in the Database. Also serializes the data.

        const birdData = await Bird.findAll();
        const birdPlain = birdData.map((bird) => bird.get({ plain: true })).filter((bird) => {
            // console.log(bird.bird_name, req.body.bird_name)
           return bird.bird_name === req.body.bird_name
        })

        console.log("req.session", req.session, birdPlain)

        // Creates an object which is partially based on the above filter's bird's id
        const locationData = await Location.create({
            bird_id: birdPlain[0].id,
            coordinates: req.body.coordinates,
            user_id: req.body.user_id // => The actual variable => req.session.user_id
        });

        // Should return this data as the response
        let dataDump = {
            bird_id: birdPlain[0].id,
            coordinates: req.body.coordinates,
            user_id: req.body.user_id //change to 'req.session.user_id' when POST method works
        }
      res.status(200).json(dataDump);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// ✔️ makes the entire bird species in question extinct
router.delete('/:id', async (req, res) => {
try {
    const birdData = await Bird.destroy({
    where: 
        {
            id: req.params.id,
        },
    });

    if (!birdData) {
    res.status(404).json({ message: 'No bird found with that id!' });
    return;
    }

    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;