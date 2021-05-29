const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

Bird.belongsToMany(User, {
  // foreignKey: 'user_id',
  through: Location,
})

User.belongsToMany(Bird,{
  // foreignKey: 'bird_id',
  through: Location,
})

// Is there not a many-to-many relationship between locations and birds?
// A bird (as a species, not an individual) and a location (set of coordinates)

module.exports = { User, Bird, Location };