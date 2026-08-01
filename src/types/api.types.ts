export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  status: boolean;
  data: T | null;
}
