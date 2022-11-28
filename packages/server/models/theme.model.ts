import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import User from './user.model';

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
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
class SiteTheme extends Model<TSiteTheme> {
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
class UserTheme extends Model<TUserTheme> {
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

export { SiteTheme, UserTheme };
