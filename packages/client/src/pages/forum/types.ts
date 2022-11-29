export type TBasicComment = {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  datetime: string;
  likes: number[],
  dislikes: number[],
};

export type TCommentWithReply = TBasicComment & {
  subComments: TBasicComment[]
}
