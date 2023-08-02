import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotel';
import { BlockedBookingMessageWrapper } from './BlockedBookingMessageWrapper';
import blockedBookingMessage from './blockedBookingMessage';

export default function HotelReservation() {
  const hotel = useHotels();

  console.log(hotel);

  function hotelContent() {
    if (hotel.hotelsError) {
      return (
        <BlockedBookingMessageWrapper>
          <h1>{blockedBookingMessage(hotel.hotelsError.response.data)}</h1>
        </BlockedBookingMessageWrapper>
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
