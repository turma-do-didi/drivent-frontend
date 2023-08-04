import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi.js';

export default function usePayment() {
  const token = useToken();

  const {
    data: paymentConfirmation,
    loading: paymentLoading,
    error: paymentError,
    act: postPayment
  } = useAsync((data) => paymentApi.postPayment(data, token), false);

  return {
    paymentConfirmation,
    paymentLoading,
    paymentError,
    postPayment
  };
}
