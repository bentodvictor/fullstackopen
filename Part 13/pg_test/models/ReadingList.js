import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db.js";

class ReadingList extends Model {}

ReadingList.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    read: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "readinglist",
  }
);

export { ReadingList };
