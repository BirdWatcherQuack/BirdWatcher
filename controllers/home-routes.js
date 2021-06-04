const router = require("express").Router();
const Sequelize = require('sequelize');
const { User, Bird } = require("../models");

// The homepage login, not logged in
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;

  }
  res.render("loginbody", {
    layout: "login",
  });
});

//✔️ gets 8 random cards and presents them on the /home page
router.get("/home", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const dbBirdData = await Bird.findAll({ order: Sequelize.literal('rand()'), limit: 8 }).then((encounters) => {
      const birdRandomCards = []
      for (let i = 0; i < encounters.length; i++) {
        let thisBird = encounters[i].get({ plain: true })
        birdRandomCards.push(thisBird)
      }
      res.render('birdcard', {
        layout: 'main',
        birdsArr: birdRandomCards,
        user_id: req.session.username,
      });
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✔️ returns a page of an individual bird's details
router.get("/singlebird/:id", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const birdsData = await Bird.findByPk(req.params.id);
    const singleBirdData = birdsData.get({ plain: true });
    res.render('singlebird', {
      layout: 'main',
      ...singleBirdData,
    });
  } catch (err) {
    console.log(err)
  }
});

// Adds the username to the navigation bar
router.get("/home", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    const userArr = userData.map((user) => user.get({ plain: true }));
    res.render('username', {
      layout: 'main',
      userArr: userArr,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
  }
});

// Creates the cookie
router.get('/home', (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  const { user: { username } = {} } = req;
  res.render('main', {
    username,
  });
});

// Returns all birds in the database in a dedicated page
router.get('/homeall', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  try {
    const dbBirdData = await Bird.findAll({});
    const birdPlain = dbBirdData.map((bird) => bird.get({ plain: true }))

    birdPlain.sort(function (a, b) {
      if (a.bird_name < b.bird_name) { return -1; }
      if (a.bird_name > b.bird_name) { return 1; }
      return 0;
    })

    res.render('allbirds', {
      layout: 'main',
      birdsArr: birdPlain,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Returns a form which allows you to create a new type of bird
router.get("/newbird", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  res.render("newbird", {
    layout: "main",
  });
});

// Returns the 'forgot password form' Handlebar
router.get('/forgot', (req, res) => {
  res.render('forgotpassword', {
    layout: 'forgot',
  });
})

// Returns a 'Terms of Service' Handlebar
router.get("/termsofservice", (req, res) => {
  res.render("termsofservice", {
    layout: "terms",
  });
});

// Returns a 'Privacy Policy' Handlebar
router.get("/privacypolicy", (req, res) => {
  res.render("privacypolicy", {
    layout: "terms",
  });
});

// Returns an interactive map Handlebar, allowing you to POST to api/birds/sightings
router.get("/map", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/")
  }
  res.render("map", {
    layout: "main",
  });
});

// Returns a bird deletion form Handlebar, allowing you to send a DELETE request to 
// api/birds/:id
router.get("/delete", (req, res) => {
  res.render("secretdelete", {
    layout: "terms",
  });
});

router.get("*", (req, res) => {
  res.redirect("/home")
});


module.exports = router;
