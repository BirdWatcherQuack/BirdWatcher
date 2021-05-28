const sequelize = require('../config/connection');
const { User } = require('../models');
const { Bird } = require('../models')

const userData = require('./userData.json');
const birdData = require('./birdData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

const seedBirdDatatbase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(birdData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedBirdDatatbase();