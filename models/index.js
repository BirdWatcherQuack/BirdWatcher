const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

User.hasMany(Bird, {
  foreignKey: 'bird_id',
});

User.hasMany(Location, {
  foreignKey: 'location_id',
});

// Bird.hasMany(User, {
//   foreignKey: 'user_id',
// });

Bird.hasMany(Location, {
  foreignKey: 'location_id',
});

// Location.hasMany(User, {
//   foreignKey: 'user_id',
// });

Location.hasMany(Bird, {
  foreignKey: 'bird_id',
});


module.exports = { User, Bird, Location };