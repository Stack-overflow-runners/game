export type TBasicComment = {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  datetime: string;
};

export type TCommentWithReply = TBasicComment & {
  subComments: TBasicComment[]
}
