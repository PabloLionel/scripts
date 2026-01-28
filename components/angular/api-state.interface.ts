export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: any | null;
}
