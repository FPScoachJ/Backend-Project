'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    //  * Add seed commands here.
    //  *
    //  * Example:
     await queryInterface.bulkInsert("characters", [
       {
         accountID: 2,
         class: "Barbarian",
         hardcore: true,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         accountID: 3,
         class: "Sorcerer",
         hardcore: false,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         accountID: 4,
         class: "Rogue",
         hardcore: true,
         createdAt: new Date(),
         updatedAt: new Date(),
       },
     ]);
  }
}

  // async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  // }
// };
