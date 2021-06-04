const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

User.hasMany(Location, {
  foreignKey: 'user_id'
});

Bird.hasMany(Location, {
  foreignKey: 'bird_id'
})

Location.belongsTo(Bird, {
  foreignKey: 'bird_id'
})

Location.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Bird, Location };