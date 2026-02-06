import { useState } from 'react';
import { login } from '../services/auth.service';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(
    email: string,
    password: string
  ) {
    try {
      setLoading(true);
      setError(null);

      const result = await login({ email, password });

      console.log('TOKEN:', result.token);

      return result;
    } catch (err: any) {
      setError('Email ou senha inválidos');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    handleLogin,
    loading,
    error,
  };
}
