'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    static associate(models) {
      events.belongsTo(models.characters, { foreignKey: "charID", onDelete: "cascade" });
      events.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "cascade",
      });
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