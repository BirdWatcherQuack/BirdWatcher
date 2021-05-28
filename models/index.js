const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

Bird.belongsToMany(User, {
  through: Location,
})

User.belongsToMany(Bird,{
  through: Location,
})

module.exports = { User, Bird, Location };