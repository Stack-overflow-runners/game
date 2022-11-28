import { Column, DataType, Model, Table } from 'sequelize-typescript';

type TUser = {
  userId: number;
  email: string;
  name: string;
  lastname: string;
};

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'users',
})
class User extends Model<TUser> {
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;
}

export default User;
