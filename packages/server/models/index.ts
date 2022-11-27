// eslint-disable-next-line max-classes-per-file
import {
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  Index,
  Unique,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';

type TUser = {
  userId: number;
  email: string;
  name: string;
  lastname: string;
};

type TSiteTheme = {
  id: number;
  theme: string;
  description: string;
};

type TUserTheme = {
  themeId: number;
  theme: string;
  device: string;
  ownerId: number;
};

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'users',
})
export class User extends Model<TUser> {
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

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model<TSiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description: string;
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<TUserTheme> {
  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  theme: string;

  @Column(DataType.STRING)
  device: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId: string;
}

export default [User, UserTheme, SiteTheme];
