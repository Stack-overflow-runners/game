import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';

export type TThread = {
  id: number;
  content: string;
  userId: number;
};

export type TPost = {
  id: number;
  content: string;
  threadId: number;
  userId: number;
};

export type TComment = {
  id: number;
  content: string;
  postId: number;
  userId: number;
};

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'threads',
})
class Thread extends Model<Partial<TThread>> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'thread_id',
  })
  threadId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => Post, 'threadId')
  posts: Post[];

  @HasMany(() => ThreadLike, 'threadId')
  likes: ThreadLike[];

  @HasMany(() => ThreadDislike, 'threadId')
  dislikes: ThreadDislike[];
}

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'posts',
})
class Post extends Model<Partial<TPost>> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
  })
  postId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => Thread)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'thread_id',
  })
  threadId: number;

  @BelongsTo(() => Thread, 'threadId')
  thread: Thread;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => Comment, 'postId')
  comments: Comment[];

  @HasMany(() => PostLike, 'postId')
  likes: PostLike[];

  @HasMany(() => PostDislike, 'postId')
  dislikes: PostDislike[];
}

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'comments',
})
class Comment extends Model<Partial<TComment>> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    field: 'comment_id',
  })
  commentId: number;

  @BelongsTo(() => Post, 'postId')
  post: Post;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => Post)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
  })
  postId: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => CommentLike, 'commentId')
  likes: CommentLike[];

  @HasMany(() => CommentDislike, 'commentId')
  dislikes: CommentDislike[];
}

@Table({
  timestamps: false,
  tableName: 'thread_likes',
})
class ThreadLike extends Model {
  @ForeignKey(() => Thread)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'thread_id',
  })
  threadId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'thread_dislikes',
})
class ThreadDislike extends Model {
  @ForeignKey(() => Thread)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'thread_id',
  })
  threadId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'post_likes',
})
class PostLike extends Model {
  @ForeignKey(() => Post)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
  })
  postId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'post_dislikes',
})
class PostDislike extends Model {
  @ForeignKey(() => Post)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'post_id',
  })
  postId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'comment_likes',
})
class CommentLike extends Model {
  @ForeignKey(() => Comment)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'comment_id',
  })
  commentId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

@Table({
  timestamps: false,
  paranoid: false,
  tableName: 'comment_dislikes',
})
class CommentDislike extends Model {
  @ForeignKey(() => Comment)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'comment_id',
  })
  commentId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

export {
  Thread,
  Post,
  Comment,
  ThreadDislike,
  ThreadLike,
  CommentLike,
  CommentDislike,
  PostLike,
  PostDislike,
};
