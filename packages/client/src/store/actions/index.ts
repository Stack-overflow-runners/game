export interface BaseActionType<T = string, P = void> {
  type: T;
  payload: P;
}