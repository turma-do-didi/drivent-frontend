import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi.js';

export default function useUserTicket() {
  const token = useToken();
  
  const {
    data: userTicket,
    loading: userTicketLoading,
    error: userTicketError,
    act: getUserTicket
  } = useAsync(() => ticketApi.getUserTicket(token));

  return {
    userTicket,
    userTicketLoading,
    userTicketError,
    getUserTicket
  };
}
