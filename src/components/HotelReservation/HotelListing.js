import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import HotelCard from './HotelCard';
import { useEffect, useState } from 'react';
import { HotelsContainer } from './HotelsContainer';

export default function HotelListing({ hotelList, selectedHotel, setSelectedHotel }) {
  const [hotels, setHotels] = useState(false);

  useEffect(() => {
    setHotels(hotelList);
  }, [hotelList]);

  const renderHotelList = () => {
    if(hotels) {
      return hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel}/>
      ));
    } else {
      return <StyledTypography variant='h5' color='textSecondary'>Carregando...</ StyledTypography>;  
    }
  };

  return (
    <>
      <StyledTypography variant='h5' color='textSecondary'>Primeiro, escolha seu hotel</StyledTypography>
      <HotelsContainer>
        {renderHotelList()}
      </HotelsContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 16px!important;
`;
