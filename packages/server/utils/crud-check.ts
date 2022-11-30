import User from '../models/user.model';
import { Post, Thread, Comment, ThreadLike } from '../models/forum.model';

const testUser = {
  email: 'test@ya.ru',
  name: 'name',
  lastname: 'lastname',
  login: 'login',
  phone: 'phone',
  avatar: 'avatar',
};

async function crudCheck() {
  const create = new User(testUser);
  await create.save();
  const read = await User.findOne({ where: { email: 'test@ya.ru' } });
  const update = await User.update(
    { name: 'nameUpdated' },
    { where: { email: 'test@ya.ru' } }
  );
  const Delete = await User.destroy({ where: { name: 'nameUpdated' } });
  const CRUD = create && read && update && Delete;

  if (CRUD) {
    console.log('CRUD operations success');
    return true;
  }
  console.log('CRUD operations failed');
  return false;
}

export async function forumModelCheck() {
  try {
    const user = new User(testUser);
    await user.save();

    const thread = new Thread({
      content: 'content',
      userId: user.userId,
    });
    await thread.save();

    const post = new Post({
      content: 'content',
      userId: user.userId,
      threadId: thread.threadId,
    });
    await post.save();
    const findPost = await Post.findOne({
      where: { content: 'content' },
      include: [Thread, User],
    });
    console.log('findPost.user', findPost?.user.name);
    const comment = new Comment({
      content: 'comment content',
      userId: user.userId,
      postId: post.postId,
    });
    await comment.save();
    const findComment = await Comment.findOne({
      where: { content: 'comment content' },
      include: [Post, User],
    });
    console.log('findComment.post', findComment?.post.postId);

    const like = new ThreadLike({
      threadId: thread.threadId,
      userId: user.userId,
    });
    await like.save();
    const findLike = await ThreadLike.findOne({
      where: { threadId: thread.threadId },
      include: [User],
    });
    console.log('findLike.user', findLike?.user.email);
    // create new user
    const user2 = new User({ ...testUser, email: 'test2@ya.ru' });
    await user2.save();
    // like thread with new user
    const like2 = new ThreadLike({
      threadId: thread.threadId,
      userId: user2.userId,
    });
    await like2.save();
    // find all likes for thread
    const findLikes = await ThreadLike.findAll({
      where: { threadId: thread.threadId },
      include: [User],
    });
    findLikes.forEach(threadLike => {
      console.log('thread liked', threadLike.user.email);
    });

    // liked threads for user
    const user2Find = await User.findOne({
      where: { email: 'test2@ya.ru' },
      include: [ThreadLike],
    });
    console.log('threadLikes.length', user2Find?.threadLikes.length);

    const ok = user2Find?.threadLikes.length;
    if (ok) {
      console.log('forum model check success');
      // clear
      await User.truncate({ cascade: true });
      return true;
    }

    console.log('forum model check error');
    return false;
  } catch (error: any) {
    console.log('forumModelCheck error', error);
    return false;
  }
}
export default crudCheck;
