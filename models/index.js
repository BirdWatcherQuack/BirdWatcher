const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

// Bird.belongsToMany(User, {
//   //  foreignKey: 'user_id',
//   through: Location,
// })

// User.belongsToMany(Bird,{
//   // foreignKey: 'bird_id',
//   through: Location,
// })

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