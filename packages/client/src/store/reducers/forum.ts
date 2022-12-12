import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchForum,
  createThread,
  createPost,
  createComment,
  setLike,
  setDislike,
} from '../action-creators/forum';
import { ForumState, setPending, setRejected } from './common';
import {
  ForumCommentTransformed,
  ForumPostTransformed,
  ForumThreadTransformed,
  LikeDislike,
  UserId,
} from '../../types/forum';

const initialState: ForumState = {
  forum: [],
  isLoading: false,
  error: null,
};

const setFulfilledForum = (
  state: ForumState,
  action: PayloadAction<ForumThreadTransformed[]>
) => {
  state.isLoading = false;
  state.error = null;
  state.forum = action.payload;
};

const fulfilledLikeDislike =
  (arrayKey: 'likes' | 'dislikes') =>
  (state: ForumState, action: PayloadAction<LikeDislike & UserId>) => {
    state.isLoading = false;
    state.error = null;
    const { postId, userId, threadId, commentId } = action.payload;
    const arrayOppositeKey = arrayKey === 'likes' ? 'dislikes' : 'likes';
    if (threadId && !postId) {
      const thread = state.forum.find(t => t.threadId === threadId);
      if (thread) {
        thread[arrayKey].push(userId);
        thread[arrayOppositeKey] = thread[arrayOppositeKey].filter(
          uId => uId !== userId
        );
      }
    }
    if (postId && threadId) {
      const thread = state.forum.find(t =>
        t.comments.some(c => c.postId === postId)
      );
      const post = thread?.comments.find(c => c.postId === postId);
      if (post) {
        post[arrayKey].push(userId);
        post[arrayOppositeKey] = post[arrayOppositeKey].filter(
          uId => uId !== userId
        );
      }
    }
    if (commentId) {
      const thread = state.forum.find(t =>
        t.comments.some(c => c.comments.some(cc => cc.commentId === commentId))
      );
      const post = thread?.comments.find(c =>
        c.comments.some(cc => cc.commentId === commentId)
      );
      const comment = post?.comments.find(c => c.commentId === commentId);
      if (comment) {
        comment[arrayKey].push(userId);
        comment[arrayOppositeKey] = comment[arrayOppositeKey].filter(
          uId => uId !== userId
        );
      }
    }
  };

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setLoadingStatus(state: ForumState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setForum(
      state: ForumState,
      action: PayloadAction<ForumThreadTransformed[]>
    ) {
      state.forum = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchForum.fulfilled.type, setFulfilledForum);
    builder.addCase(fetchForum.pending.type, setPending<ForumState>);
    builder.addCase(fetchForum.rejected.type, setRejected<ForumState, string>);

    builder.addCase(
      createThread.fulfilled.type,
      (state: ForumState, action: PayloadAction<ForumThreadTransformed>) => {
        state.isLoading = false;
        state.error = null;
        state.forum.push(action.payload);
      }
    );
    builder.addCase(createThread.pending.type, setPending<ForumState>);
    builder.addCase(
      createThread.rejected.type,
      setRejected<ForumState, string>
    );

    builder.addCase(
      createPost.fulfilled.type,
      (state: ForumState, action: PayloadAction<ForumPostTransformed>) => {
        state.isLoading = false;
        state.error = null;
        const { threadId } = action.payload;
        if (threadId) {
          const thread =
            state.forum[state.forum.findIndex(t => t.threadId === threadId)];
          if (thread) {
            thread.comments.push(action.payload);
          }
        }
      }
    );

    builder.addCase(createPost.pending.type, setPending<ForumState>);
    builder.addCase(createPost.rejected.type, setRejected<ForumState, string>);

    builder.addCase(
      createComment.fulfilled.type,
      (state: ForumState, action: PayloadAction<ForumCommentTransformed>) => {
        state.isLoading = false;
        state.error = null;
        const { postId } = action.payload;
        if (postId) {
          const thread = state.forum.find(t =>
            t.comments.some(c => c.postId === postId)
          );
          const post = thread?.comments.find(c => c.postId === postId);
          if (post) {
            post.comments.push(action.payload);
          }
        }
      }
    );
    builder.addCase(createComment.pending.type, setPending<ForumState>);
    builder.addCase(
      createComment.rejected.type,
      setRejected<ForumState, string>
    );
    builder.addCase(setLike.fulfilled.type, fulfilledLikeDislike('likes'));
    builder.addCase(setLike.pending.type, setPending<ForumState>);
    builder.addCase(setLike.rejected.type, setRejected<ForumState, string>);

    builder.addCase(
      setDislike.fulfilled.type,
      fulfilledLikeDislike('dislikes')
    );
    builder.addCase(setDislike.pending.type, setPending<ForumState>);
    builder.addCase(setDislike.rejected.type, setRejected<ForumState, string>);
  },
});

export const { setLoadingStatus, setForum } = forumSlice.actions;

export default forumSlice.reducer;
