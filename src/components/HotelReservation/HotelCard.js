import styled from 'styled-components';
import useHotelDetails from '../../hooks/api/useHotelDetails';
import { useEffect, useState } from 'react';
import { getHotelCapacity, getResevedRoom, getRoomOcuppancy, getRoomTypes } from '../../utils/hotelUtils';

export default function HotelCard({ hotel, setSelectedHotel, selectedHotel, setSelectedRoom, resume, booking }) {
  const { hotelDetails } = useHotelDetails(hotel.id);
  const [emptyVacancy, setEmptyVacancy] = useState('Carregando');
  const [roomTypes, setRoomTypes] = useState('Carregando');
  
  console.log(booking);
  useEffect(() => {
    if (hotelDetails && !booking) {
      setEmptyVacancy(getHotelCapacity(hotelDetails.Rooms));
      setRoomTypes(getRoomTypes(hotelDetails.Rooms));
    } else if (booking) {
      setEmptyVacancy(getRoomOcuppancy(booking.Room.Booking.length));
      setRoomTypes(getResevedRoom(booking.Room));
    }
  }, [hotelDetails]);

  const selectCard = () => {
    setSelectedHotel(hotelDetails);
    if (selectedHotel && hotel.id !== selectedHotel.id) {
      setSelectedRoom(null);
    }
  };

  const cardColor = () => {
    if ((selectedHotel && selectedHotel.id === hotel.id) || resume) {
      return '#FFEED2';
    }
    return '#EBEBEB';
  };

  return (
    <HotelCardContainer onClick={resume ? null : selectCard} cardColor={cardColor}>
      <HotelPicture src={hotel.image} />
      <HotelName>{hotel.name}</HotelName>
      <Title>{booking ? 'Quarto reservado' : 'Tipos de acomodação:'}</Title>
      <Content>{roomTypes}</Content>
      <Title>{booking ? 'Pessoas no seu quarto' : 'Vagas disponíveis:'}</Title>
      <Content>{emptyVacancy}</Content>
    </HotelCardContainer>
  );
}

const HotelCardContainer = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background-color: ${(props) => props.cardColor};
  padding: 16px 14px;
  box-sizing: border-box;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const HotelPicture = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
  background-color: white;
  margin-bottom: 10px;
`;

const HotelName = styled.h1`
  color: #343434;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
  max-width: 168px;
  max-height: 23px;
  overflow: hidden;
`;

const Title = styled.h2`
  color: #3c3c3c;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  max-width: 168px;
  max-height: 14px;
  margin-bottom: 2px;
`;

const Content = styled.h3`
  color: #3c3c3c;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-width: 168px;
  max-height: 14px;
  margin-bottom: 14px;
`;
