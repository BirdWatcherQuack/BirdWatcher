const router = require('express').Router();
const { User, Birds } = require('../models');


router.get('/', (req, res) => {
  res.render('loginbody', { layout: 'login' });
  //console.log('Hello')
})

router.get('/home', (req, res) =>
  res.render('homepage', { layout: 'main' }))
module.exports = router;

router.get('/termsofservice', (req, res) => {
  res.render('termsofservice', { layout: 'main' });
  //console.log('Hello')
})

router.get('/privacypolicy', (req, res) => {
  res.render('privacypolicy', { layout: 'main' });
  //console.log('Hello')
})