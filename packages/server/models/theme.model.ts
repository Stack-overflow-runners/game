import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import User from './user.model';

type TSiteTheme = {
  themeId: number;
  theme: string;
  description: string;
};

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export class SiteTheme extends Model<Partial<TSiteTheme>> {
  @Index
  @AllowNull(false)
  @PrimaryKey
  @Default('default')
  @Unique
  @Column(DataType.STRING)
  theme: string;

  @HasMany(() => User, 'theme')
  users: User[];

  @Column(DataType.STRING)
  description: string;
}

const model = { SiteTheme };
export default model;
