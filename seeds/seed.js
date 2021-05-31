const sequelize = require('../config/connection');
const { User } = require('../models');
const { Bird } = require('../models')
const { Location } = require('../models')

const userData = require('./userData.json');
const birdData = require('./birdData.json')
const locationData = require('./sightingData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  //await Bird.bulkCreate(birdData, {
  //  individualHooks: true,
  //  returning: true,
  //});
  for (const bird of birdData) {
    await Bird.create({
      ...bird,
      bird_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};


seedDatabase();
