import { http } from '@/shared/services/http';
import type { LoginRequest } from '../dto/LoginRequest.dto';
import type { LoginResponse } from '../dto/LoginResponse.dto';

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await http.post<LoginResponse>(
    'http://localhost:3000/auth/login',
    data
  );

  return response.data;
}
