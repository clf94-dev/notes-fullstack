"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Note.belongsToMany(models.Tag, {
        through: "NoteTags",
        foreignKey: "noteId",
        otherKey: "tagId",
        as: "tags",
      });
      Note.belongsToMany(models.Tag, {
        through: "NoteTags",
        foreignKey: "noteId",
        otherKey: "tagId",
        as: "filterTags",
      });
    }
  }

  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
        validate: {
          isIn: [["active", "archived", "deleted"]],
        },
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );

  return Note;
};
