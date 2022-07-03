export default interface StandardResponse<T = unknown> {
  message: string;
  data: T;
}
