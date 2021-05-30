const User = require('./User');
const Bird = require('./Bird');
const Location = require('./Location');

Bird.belongsToMany(User, {
   foreignKey: 'user_id',
  through: Location,
})

User.belongsToMany(Bird,{
  foreignKey: 'bird_id',
  through: Location,
}) 

module.exports = { User, Bird, Location };