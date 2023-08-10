import api from './api';

export async function signInGithub(codeParam) {
  const response = await api.post('http://localhost:4000/auth/sign-in/github?code=' + codeParam);
  return response.data;
}
