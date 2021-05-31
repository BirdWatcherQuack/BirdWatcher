const router = require("express").Router();
const { User, Bird } = require("../models");

router.get("/", (req, res) => {
  res.render("loginbody", {
    layout: "login",
  });
});

router.get("/home", async (req, res) => {
  try {
    const birdData = await Bird.findAll({});
    const birdsArr = birdData.map((bird) => bird.get({ plain: true }));
    console.log('birdsArr', birdsArr)
    res.render('birdcard', {
      layout: 'main',
      birdsArr: birdsArr
    });
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get("/singlebird/:id", async (req, res) => {
  try {
    //const birdData = await Bird.findAll({});
    const birdsData = await Bird.findByPk(req.params.id, {

    });
    const birdsArr = birdsData.get({ plain: true });
    console.log('birdsArr', birdsArr)
    res.render('singlebird', {
      layout: 'main',
      birdsArr,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
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
