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

export async function postSubscription(token, activityId) {
  const response = await api.post(
    '/activity/subscriptions',
    {
      activityId: activityId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteSubscription(token, activityId) {
  const response = await api.delete('/activity/subscriptions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      activityId: activityId,
    },
  });
  return response.data;
}
