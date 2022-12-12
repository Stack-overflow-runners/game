import ThreadController from './threadController';
import ForumController from './forumController';
import PostController from './postController';
import CommentController from './commentController';
import LikeController from './likeController';
import UserController from './userController';

const controllers = {
  ThreadController,
  ForumController,
  LikeController,
  PostController,
  CommentController,
  UserController,
};

export {
  ThreadController,
  ForumController,
  UserController,
  LikeController,
  PostController,
  CommentController,
};

export default controllers;
