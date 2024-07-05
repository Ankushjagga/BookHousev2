'use strict';
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcryptjs")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{

const hash1 = await  bcrypt.hash("ankush@123",10);
const hash11 = await  bcrypt.hash("ankush@123",10);
const hash2 =  await bcrypt.hash("rohit@123",10);
const hash22 = await  bcrypt.hash("rohit@123",10);
queryInterface.bulkInsert("users" ,[
  // {
  //   id : uuidv4(),
  //   name: "Ankush Jagga",
  //   email : "ankushjagga97@gmail.com",
  //   password : hash1,
  //   PhoneNumber : 9876054247,
  //   createdAt : new Date(),
  //   updatedAt : new Date(),
  //   role : "admin"

  // },
  {
    id : uuidv4(),
    name: "rohit",
    email : "rohit@gmail.com",
    password :hash2 ,
    PhoneNumber : 7508619190,
    createdAt : new Date(),
    updatedAt : new Date(),

  },
])
console.log("datat insertedd");
    }catch(error){
  console.log("erooor". error);
    }

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
    await queryInterface.bulkDelete('users', null, {});
    console.log("Data deleted successfully.");
  }
};
