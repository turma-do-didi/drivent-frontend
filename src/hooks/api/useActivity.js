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
