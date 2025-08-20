"use strict"
const { Model } = require('sequelize')
const { sequelize } = require('.')

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
        // define association here

        }
    }
    
    Tag.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Tag',
    })
    
    return Tag
}