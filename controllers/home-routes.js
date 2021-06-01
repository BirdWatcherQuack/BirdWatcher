const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Bird } = require("../models");

router.get("/", (req, res) => {
  res.render("loginbody", {
    layout: "login",
  });
});

//✔️ gets 6 random 
router.get("/home", async (req, res) => {
  try {
    const dbBirdData = await Bird.findAll({ order: Sequelize.literal('rand()'), limit: 6 }).then((encounters) => {
      const birdRandomCards = []
      for (let i = 0; i < encounters.length; i++) {
        let thisBird = encounters[i].get({ plain: true })
        birdRandomCards.push(thisBird)
      }
      console.log('thisBird', birdRandomCards)
      res.render('birdcard', {
        layout: 'main',
        birdsArr: birdRandomCards,
      });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✔️ but does not present on page
router.get("/singlebird/:id", async (req, res) => {
  try {
    const birdsData = await Bird.findByPk(req.params.id);
    const singleBirdData = birdsData.get({ plain: true });
    res.render('singlebird', {
      layout: 'main',
      ...singleBirdData,
    });
    //res.status(200).json(singleBirdData);
  } catch (err) {
    console.log(err)
    //res.status(500).json(err);
  }
});

router.get("/home", async (req, res, next) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    // const user = userData.map((username) => username.get({ plain: true }));
    const user = userData.get({ plain: true });

    res.render('username', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/homeall', async (req, res) => {
  try {
      const dbBirdData = await Bird.findAll();
      const birdPlain = dbBirdData.map((bird) => bird.get({ plain: true }))

      birdPlain.sort(function(a, b){
        if(a.bird_name < b.bird_name) { return -1; }
        if(a.bird_name > b.bird_name) { return 1; }
        return 0;
      })
      res.render('birdcard', {
        layout: 'main',
        birdsArr: birdPlain
      });
      // for (let i = 0 ; i < birdPlain.length; i++) {
      // console.log(birdPlain)
      // }

        res.status(200).json(birdPlain);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get("/termsofservice", (req, res) => {
  res.render("termsofservice", {
    layout: "main",
  });
  //console.log('Hello')
});

router.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy", {
    layout: "main",
  });
  //console.log('Hello')
});

router.get("/map", (req, res) => {
  res.render("map", {
    layout: "main",
  });
});


module.exports = router;
