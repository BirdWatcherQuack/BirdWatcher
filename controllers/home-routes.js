 const router = require('express').Router();
const { User, Birds } = require('../models');


router.get('/', (req, res) => {
  res.render('loginbody', { layout: 'login' });
  //console.log('Hello')
})

router.get('/home', async (req, res) => {
  try {
    const birdData = await Bird.findAll({});
    const birdsArr = birdData.map((bird) => bird.get({ plain: true }));
    console.log('birdsArr', birdsArr)
    res.render('birdcard', {
      layout: 'main',
      birdsArr: birdsArr
    })
  } catch (err) {
    console.log(err)
  }
})

router.get('/termsofservice', (req, res) => {
  res.render('termsofservice', { layout: 'main' });
  //console.log('Hello')
})

router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', { layout: 'main' });
  //console.log('Hello')
})

router.get('/map', (req, res) => {
  res.render('map', { layout: 'main' });
})

module.exports = router;
