export type TBasicComment = {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  datetime: Date;
  likes: number[],
  dislikes: number[],
};

export type TCommentWithReply = TBasicComment & {
  subComments: TBasicComment[]
}

export type TTopic = TBasicComment & {
  comments: TCommentWithReply[];
}
