const router = require('express').Router();
const Sequelize = require('sequelize');
const { Bird, Location, User } = require('../../models');

// for api/cards route

router.get('/', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
        const dbBirdData = await Bird.findAll();
        const birdPlain = dbBirdData.map((bird) => bird.get({ plain: true }))

        birdPlain.sort(function(a, b){
          if(a.bird_name < b.bird_name) { return -1; }
          if(a.bird_name > b.bird_name) { return 1; }
          return 0;
      })
      for (let i = 0 ; i < birdPlain.length; i++) {
      console.log(birdPlain)
      }

        res.status(200).json(birdPlain);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // ✔️ is expressed in /home
router.get('/random', async (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/")
    }
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