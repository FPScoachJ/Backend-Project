'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    //  * Add seed commands here.
    //  *
    //  * Example:
     await queryInterface.bulkInsert("users", [
       {
         name: "John Doe",
         email: "johndoe@example.com",
         password: "password123",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Jane Smith",
         email: "janesmith@example.com",
         password: "abc123",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
         name: "Alice Johnson",
         email: "alicejohnson@example.com",
         password: "p@$$w0rd",
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
//   }
// };
