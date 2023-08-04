import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotels() {
  // Hook que armazena o token do usuario
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels
  } = useAsync(() => hotelApi.getHotels(token));

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotels
  };
}

