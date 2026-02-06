import { http } from '@/shared/services/http';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await http.post<LoginResponse>(
    '/login',
    data
  );

  return response.data;
}
