import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi.js';

export default function useCreateReservation() {
  const token = useToken();

  const {
    data: reservationResume,
    loading: reservationLoading,
    error: reservationError,
    act: postReservation
  } = useAsync((data) => ticketApi.createReservation(data, token), false);

  return {
    reservationResume,
    reservationLoading,
    reservationError,
    postReservation
  };
}
