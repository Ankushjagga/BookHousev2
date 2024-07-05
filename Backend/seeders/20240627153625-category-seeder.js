'use strict';
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {



    await queryInterface.bulkInsert('categories',[
      {
        id : uuidv4(),
        "name": "Books",
        "image":"book.png",
            createdAt : new Date(),
    updatedAt : new Date(),
      },
      {
        id : uuidv4(),
        "name": "Bags",
        "image":"bag.jpg",
            createdAt : new Date(),
    updatedAt : new Date(),
      },
      {
        id : uuidv4(),
        "name": "Stationary",
        "image": "stationary.png",
            createdAt : new Date(),
    updatedAt : new Date(),
      },
      {
        id : uuidv4(),
        "name": "Notebooks",
        "image": "notebook.png",
            createdAt : new Date(),
    updatedAt : new Date(),
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
