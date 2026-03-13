import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs (opcional, mas útil)
http.interceptors.request.use(request => {
  console.log('🚀 Request:', request.method, request.url);
  return request;
});

http.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.log('❌ Error:', error.message);
    return Promise.reject(error);
  }
);