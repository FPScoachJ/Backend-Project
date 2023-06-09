"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //  * Add seed commands here.
    //  *
    //  * Example:
    await queryInterface.bulkInsert("events", [
      {
        hardcore: "Yes",
        charID: 4,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hardcore: "No",
        charID: 5,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hardcore: "Yes",
        charID: 6,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
};

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
