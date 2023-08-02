import styled from 'styled-components';
import useHotelDetails from '../../hooks/api/useHotelDetails';
import { useEffect, useState } from 'react';

export default function HotelCard({ hotel }) {
  const { hotelDetails } = useHotelDetails(hotel.id);
  const [emptyVacancy, setEmptyVacancy] = useState('Carregando');

  console.log(hotelDetails);
  useEffect(() => {
    if (hotelDetails) {
      let capacity = 0;
      hotelDetails.Rooms.forEach(room => {
        capacity += room.capacity;
      });
      let reserved = 0;
      hotelDetails.Rooms.forEach(room => {
        reserved += room.Booking.length;
      });
      setEmptyVacancy(capacity - reserved);
    }
  }, [hotelDetails]);

  return (
    <HotelCardContainer>
      <HotelPicture src={hotel.image} />
      <HotelName>{hotel.name}</HotelName>
      <Title>Tipos de acomodação:</Title>
      <Content>single</Content>
      <Title>Vagas disponíveis:</Title>
      <Content>{emptyVacancy}</Content>
    </HotelCardContainer>
  );
}

const HotelCardContainer = styled.div`
    width: 196px;
    height: 264px;
    border-radius: 10px;
    background-color: #EBEBEB;
    padding: 16px 14px;
    box-sizing: border-box;
    margin-right: 20px;
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
    color: #3C3C3C;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    max-width: 168px;
    max-height: 14px;
    margin-bottom: 2px;
`;

const Content = styled.h3`
    color: #3C3C3C;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    max-width: 168px;
    max-height: 14px;
    margin-bottom: 14px;
`;
