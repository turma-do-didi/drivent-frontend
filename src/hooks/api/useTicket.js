import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi.js';

export default function useTicket() {
  const token = useToken();
  
  const {
    data: tickets,
    loading: ticketLoading,
    error: ticketError,
    act: getTicketTypes
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    tickets,
    ticketLoading,
    ticketError,
    getTicketTypes
  };
}
