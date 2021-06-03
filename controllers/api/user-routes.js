const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
//const uuidv1 = require('uuid/v1');
// CREATE new user
router.post('/', async (req, res) => {
  try {


    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });


    // res.status(200).json(userData);

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    console.log(dbUserData)

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    // if (await bcrypt.compare(req.body.password, user.password)) {
    //   res.send('Success')

    // }
    // Once the user successfully logs in, set up the sessions variable 'loggedIn'

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id
      req.session.username = dbUserData.username
      console.log("login", req.session)
      res
        .status(200)
        .json({ id: dbUserData.id, user: dbUserData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;