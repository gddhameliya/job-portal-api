import { Sequelize, DataTypes, Model } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public username!: string;
    public password_hash!: string;
    public date_of_birth!: Date;
    public registration_date!: Date;
    public last_login_date!: Date;
    toJSON() {
      let attributes = Object.assign({}, this.get());
      delete attributes.password_hash;
      return attributes;
    }

    static associate(models: any) {
      //* define association here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        comment: "User ID",
      },
      email: {
        type: DataTypes.STRING,
        // comment: "Email",
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
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
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};