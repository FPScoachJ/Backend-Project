'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    static associate(models) {
      events.belongsTo(models.characters, { foreignKey: "charID" });
      events.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  
  events.init(
    {
      hardcore: DataTypes.BOOLEAN,
      charID: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'events',
    }
  );

  return events;
};