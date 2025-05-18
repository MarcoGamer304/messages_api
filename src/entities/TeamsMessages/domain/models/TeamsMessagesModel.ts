import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../../../../database/connection";

class TeamsMessages extends Model<
  InferAttributes<TeamsMessages>,
  InferCreationAttributes<TeamsMessages>
> {
  declare id: CreationOptional<number>;
  declare sender_id: number;
  declare recipient_id: number;
  declare groupId: number;
  declare content: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare status: string;
}

TeamsMessages.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "sent",
    },
  },
  {
    sequelize,
    modelName: "TeamMessages",
    tableName: "team_messages",
    timestamps: true,
  }
);

export default TeamsMessages;
