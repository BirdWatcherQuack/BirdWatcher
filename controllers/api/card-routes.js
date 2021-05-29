const router = require('express').Router();
const Sequelize = require('sequelize');
const { Bird, Location, User } = require('../../models');

// for api/cards route

router.get('/', async (req, res) => {
  try {
        const dbBirdData = await Bird.findAll();
        const birdPlainText = dbBirdData[i].get({ plain: true })
        // const birdList = []
        // for (let i = 0 ; i < dbBirdData.length; i++) {
        //   const birdOfChoice = dbBirdData[i].get({ plain: true })
        //   const birdPackage = {
        //     id: birdOfChoice.id,
        //     bird_type: birdOfChoice.bird_type,
        //     bird_name: birdOfChoice.bird_name,
        //     latin_name: birdOfChoice.latin_name,
        //     max_age: birdOfChoice.max_age,
        //     weight: birdOfChoice.weight,
        //     description: birdOfChoice.description,
        //     bird_img: birdOfChoice.bird_img
        //   }
        //   birdList.push(birdPackage)
        // }
        // console.log(birdList)

        res.status(200).json(birdPlainText);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/random', async (req, res) => {
      // const dbBirdData = await Bird.findAll();
      const dbBirdData = await Bird.findAll({ order: Sequelize.literal('rand()'), limit: 5 }).then((encounters) => {
        const birdRandomCards = []
        for (let i = 0; i < encounters.length; i++) {
          let thisBird = encounters[i].get({ plain: true })
          birdRandomCards.push(thisBird)
          // encounters.get({ plain: true })
        }
        console.log(birdRandomCards)
        res.status(200).json(birdRandomCards);

      })
});

  module.exports = router;