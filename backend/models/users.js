"use strict"
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        // define association here
        User.hasMany(models.Note, { foreignKey: 'userId', as: 'notes' })
        }
    }
    
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
            isEmail:true
            }  
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        colorTheme: {
            type:DataTypes.STRING,
            values: ['light', 'dark', 'system'],
            defaultValue: 'system'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
,
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fontTheme: {
            type: DataTypes.STRING, 
            values: ['sans-serif', 'serif', 'monospace'],
            defaultValue: 'sans-serif'
        }
    }, {
        sequelize,
        modelName: 'User',
    })
    
    return User
}