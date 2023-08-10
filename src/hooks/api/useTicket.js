import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi.js';

export function useTicket() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketLoading,
    error: ticketError,
    act: getTicketTypes,
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    tickets,
    ticketLoading,
    ticketError,
    getTicketTypes,
  };
}

export function useTicketByUserId() {
  const token = useToken();

  const {
    data: tickets,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket,
  } = useAsync(() => ticketApi.getTicket(token));

  return {
    tickets,
    ticketLoading,
    ticketError,
    getTicket,
  };
}
