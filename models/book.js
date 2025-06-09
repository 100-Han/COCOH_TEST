const Sequelize = require('sequelize');
const { options } = require('../routes/book');

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            validate: {
                min: 0.0,
                max: 5.0
            }
        }
        },
        {
        sequelize,
        tableName: 'book',
        timestamps: false,
        charset: 'utf-8',
        collate: 'utf8_general_ci'
        });

    return Book;
}