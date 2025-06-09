'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('test1', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type: Sequelize.STRING,
          allowNull: false
      },
      author: {
          type: Sequelize.STRING,
          allowNull: false
      },
      publishedDate: {
          type: Sequelize.DATE,
          allowNull: true
      },
      rating: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
          validate: {
              min: 0.0,
              max: 0.5
          }
      }
    }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
    }
    )},

  async down (queryInterface, Sequelize) {

  }
}
