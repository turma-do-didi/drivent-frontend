import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useHotelDetails(hotelId) {
  const token = useToken();

  const {
    data: hotelDetails,
    loading: hotelDetailsLoading,
    error: hotelDetailsError,
    act: getHotelDetails
  } = useAsync(() => hotelApi.getHotelDetails(token, hotelId));

  return {
    hotelDetails,
    hotelDetailsLoading,
    hotelDetailsError,
    getHotelDetails
  };
}
