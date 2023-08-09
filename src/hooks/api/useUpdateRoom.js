import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';
import useBooking from './useBooking';

export  default function useUpdateBooking() {
  const token = useToken();
  const { booking } = useBooking();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking
  } = useAsync((data) => bookingApi.updateBooking(booking.id, data, token), false);
    
  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking
  };
}
