const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

Bird.belongsToMany(User, {
  through: Location,
})

User.belongsToMany(Bird,{
  through: Location,
})

// User.hasMany(Location, {
//   foreignKey: 'user_id'
// })

// Location.hasMany(Bird, {
//   foreignKey: 'location_bird_name'
// })

// Is there not a many-to-many relationship between locations and birds?
// A bird (as a species, not an individual) and a location (set of coordinates)

module.exports = { User, Bird, Location };