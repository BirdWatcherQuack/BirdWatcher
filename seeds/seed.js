const sequelize = require('../config/connection');
const { User } = require('../models');
const { Bird } = require('../models')
const { Location } = require('../models')

const userData = require('./userData.json');
const birdData = require('./birdData.json')
const locationData = require('./sightingData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
<<<<<<< HEAD
  await Bird.bulkCreate(birdData, {
    individualHooks: true,
    returning: true,
  });
  await Location.bulkCreate(locationData, {
=======

  process.exit(0);
};

seedDatabase();

const seedBirdDatabase = async () => {
  await sequelize.sync({ force: true });
  await Bird.bulkCreate(birdData, {
>>>>>>> 4d022f672aa440f1ea5ed5d26df9097c840db598
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

<<<<<<< HEAD

seedDatabase();
=======
seedBirdDatabase();
>>>>>>> 4d022f672aa440f1ea5ed5d26df9097c840db598
