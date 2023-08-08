import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotel';
import BlockedBooking from './BlockedBooking';
import HotelListing from './HotelListing';
import { useState } from 'react';
import RoomListing from './RoomListing';
import useBooking from '../../hooks/api/useBooking';

export default function HotelReservation() {
  const { booking } = useBooking();
  const hotel = useHotels();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  console.log(booking);

  function hotelContent() {
    if (hotel.hotelsError) {
      return (
        <BlockedBooking error={hotel.hotelsError} />
      );
    } else if(!hotel.hotelsError && !booking) {
      return (
        <>
          <HotelListing hotelList={hotel.hotels} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} setSelectedRoom={setSelectedRoom} />
          {selectedHotel ? <RoomListing rooms={selectedHotel.Rooms} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} /> : null}
        </>
      );
    } else if (!hotel.hotelsError && booking) {
      return (
        <h1>Quem ja tem reserva cai aq</h1>
      );
    }
  }

  return (
    <>
      <StyledTypography variant='h4' > Escolha de hotel e quarto</StyledTypography >
      {hotelContent()}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
