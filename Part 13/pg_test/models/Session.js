import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

class Session extends Model {}

Session.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "session",
  }
);

export { Session };
