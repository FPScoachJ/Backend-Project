'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeConstraint("events", "events_charID_fkey");
    queryInterface.removeConstraint("events", "events_userId_fkey");
    queryInterface.removeConstraint("characters", "characters_accountID_fkey");

    queryInterface.addConstraint("events", {
      type: "foreign key",
      fields: ["charID"],
      name: "events_charID_fkey",
      references: {
        table: "characters",
        field: "id"
      },
      onDelete: "cascade"
    });

    queryInterface.addConstraint("events", {
      type: "foreign key",
      fields: ["userId"],
      name: "events_userId_fkey",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade"
    });

    queryInterface.addConstraint("characters", {
      type: "foreign key",
      fields: ["accountID"],
      name: "characters_accountID_fkey",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade"
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint("events", "events_charID_fkey");
    queryInterface.removeConstraint("events", "events_userId_fkey");
    queryInterface.removeConstraint("characters", "characters_accountID_fkey");

    queryInterface.addConstraint("events", {
      type: "foreign key",
      fields: ["charID"],
      name: "events_charID_fkey",
      references: {
        table: "characters",
        field: "id"
      }
    });

    queryInterface.addConstraint("events", {
      type: "foreign key",
      fields: ["userId"],
      name: "events_userId_fkey",
      references: {
        table: "users",
        field: "id"
      }
    });

    queryInterface.addConstraint("characters", {
      type: "foreign key",
      fields: ["accountID"],
      name: "characters_accountID_fkey",
      references: {
        table: "users",
        field: "id"
      }
    });
  }
};
