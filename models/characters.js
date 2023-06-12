'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      characters.hasMany(models.events, { foreignKey: "charID" });
      characters.belongsTo(models.user, {foreignKey: "accountID", onDelete: "cascade"})
    }
  }
  characters.init({
    accountID: DataTypes.INTEGER,
    class: DataTypes.STRING,
    hardcore: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'characters',
  });
  return characters;
};