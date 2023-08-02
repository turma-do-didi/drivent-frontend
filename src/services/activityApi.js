import api from './api';

export async function getDates(token) {
  const response = await api.get('/activity/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
