"use strict"
const { Model } = require('sequelize')
const { sequelize } = require('.')

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {
        static associate(models) {
            Tag.belongsToMany(models.User, {
                through: 'UserTags',
                foreignKey: 'tagId',
                otherKey: 'userId',
                as: 'users'
            })
            Tag.belongsToMany(models.Note, {
              through: "NoteTags",
              foreignKey: "tagId",
              otherKey: "noteId",
              as: "notes",
            });

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
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Tag',
    })
    
    return Tag
}