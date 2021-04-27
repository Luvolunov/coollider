export interface ApiResponse<T = null> {
  success: boolean;
  body: T;
  message?: string;
}
