import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: getBooking
  } = useAsync((data) => bookingApi.getUserBooking(token));

  return {
    booking,
    bookingLoading,
    bookingError,
    getBooking
  };
}
