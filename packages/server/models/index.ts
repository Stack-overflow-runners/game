import User from './user.model';
import { UserTheme, SiteTheme } from './theme.model';
import {
  Thread,
  Post,
  Comment,
  ThreadLike,
  ThreadDislike,
  CommentLike,
  CommentDislike,
  PostLike,
  PostDislike,
} from './forum.model';

export default [
  User,
  SiteTheme,
  UserTheme,
  Thread,
  Post,
  Comment,
  ThreadLike,
  ThreadDislike,
  CommentLike,
  CommentDislike,
  PostLike,
  PostDislike,
];
