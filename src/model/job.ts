import { Sequelize, DataTypes, Model } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Job extends Model {
    public id!: number;
    public title!: string;
    public description!: string;

    static associate(models: any) {
      //* define association here
    }
  }

  Job.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "Job ID",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Job tittle",
      },
      description: {
        type: DataTypes.STRING,
        comment: "Job descripton",
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Is Active",
      },
    },
    {
      sequelize,
      modelName: "Job",
      freezeTableName: true,
    }
  );
  return Job;
};
