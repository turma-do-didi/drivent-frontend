import api from './api';

export async function getDates(token) {
  const response = await api.get('/activity/days', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getLocations(token) {
  const response = await api.get('/activity/locations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getActivities(token, date) {
  const response = await api.get('/activity/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      date: date,
    },
  });
  return response.data;
}
