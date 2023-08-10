import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export function useActivityDates() {
  // Hook que armazena o token do usuario
  const token = useToken();

  const {
    data: dates,
    loading: datesLoading,
    error: datesError,
    act: getDates,
  } = useAsync(() => activityApi.getDates(token));

  return {
    dates,
    datesLoading,
    datesError,
    getDates,
  };
}

export function useLocations() {
  // Hook que armazena o token do usuario
  const token = useToken();

  const {
    data: locations,
    loading: locationsLoading,
    error: locationsError,
    act: getLocations,
  } = useAsync(() => activityApi.getLocations(token));

  return {
    locations,
    locationsLoading,
    locationsError,
    getLocations,
  };
}

export function useActivitiesDone() {
  // Hook que armazena o token do usuario
  const token = useToken();

  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivitiesDone,
  } = useAsync(() => activityApi.getActivitiesDone(token));

  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivitiesDone,
  };
}

export async function useActivities(token, date) {
  try {
    const activities = await activityApi.getActivities(token, date);
    return activities;
  } catch {
    throw new Error('An error occurred while trying to fetch the activities');
  }
}

export async function useCreateSubscription(token, activityId) {
  try {
    await activityApi.postSubscription(token, activityId);
  } catch {
    throw new Error('An error occurred while trying to post new subscription');
  }
}

export async function useDeleteSubscription(token, activityId) {
  try {
    await activityApi.deleteSubscription(token, activityId);
  } catch {
    throw new Error('An error occurred while trying to delete a subscription');
  }
}
