const {Sequelize, DataTypes} = require("sequelize");
const db = require("../util/database");

const Animal = db.define(
    "animals",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        type: {
            type: DataTypes.STRING,

        },
        address: {
            type: DataTypes.STRING
        },
        adopted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = Animal;
