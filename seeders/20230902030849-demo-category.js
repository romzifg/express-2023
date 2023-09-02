'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      [
        {
          id: 1,
          name: 'Iphone 14',
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Samsung Z Flip 4',
          description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'ROG',
          description: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
