const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Bird extends Model { }

Bird.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bird_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bird_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bird_img: {
      type: DataTypes.STRING,
      allowNull: false
    },

    sighting: {
      type: DataTypes.GEOMETRY('POINT'),
      references: {
        model: 'location',
        key: 'coordinates'
      },
    },
    user_id_creator: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'bird',
    }
  
);

module.exports = Bird;