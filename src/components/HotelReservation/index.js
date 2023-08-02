import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotel';
import BlockedBooking from './BlockedBookingMessageWrapper';

export default function HotelReservation() {
  const hotel = useHotels();

  console.log(hotel);

  function hotelContent() {
    if (hotel.hotelsError) {
      return (
        <BlockedBooking error={hotel.hotelsError} />
      );
    }
  }

  return (
    <>
      <StyledTypography StyledTypography variant='h4' > Escolha de hotel e quarto</StyledTypography >
      {hotelContent()}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
