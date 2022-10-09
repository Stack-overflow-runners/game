export type ResponseFormat<T> = {
  data: T;
  status: number;
  error: string | null;
};
export type ApiResponse<T> = Promise<ResponseFormat<T>>;
