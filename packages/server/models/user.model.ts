import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
// eslint-disable-next-line import/no-cycle
import {
  Comment,
  CommentDislike,
  CommentLike,
  Post,
  PostDislike,
  PostLike,
  Thread,
  ThreadDislike,
  ThreadLike,
} from './forum.model';

type TUser = {
  userId: number;
  yandexId: number;
  email: string;
  name: string;
  lastname: string;
  login: string;
  phone: string;
  avatar: string;
};

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'users',
})
class User extends Model<Partial<TUser>> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'yandex_id',
    allowNull: true,
  })
  yandexId: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  login: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @HasMany(() => Thread, 'userId')
  threads: Thread[];

  @HasMany(() => Post, 'userId')
  posts: Post[];

  @HasMany(() => Comment, 'userId')
  comments: Comment[];

  @HasMany(() => ThreadLike, 'userId')
  threadLikes: ThreadLike[];

  @HasMany(() => ThreadDislike, 'userId')
  threadDislikes: ThreadDislike[];

  @HasMany(() => PostLike, 'userId')
  postLikes: PostLike[];

  @HasMany(() => PostDislike, 'userId')
  postDislikes: PostDislike[];

  @HasMany(() => CommentLike, 'userId')
  commentLikes: CommentLike[];

  @HasMany(() => CommentDislike, 'userId')
  commentDislikes: CommentDislike[];
}

export default User;
