import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HotelsContainer } from './HotelsContainer';
import HotelCard from './HotelCard';

export default function BookingResume({ hotel }) {
  return (
    <>
      <StyledTypography variant='h5' color='textSecondary'>Você já escolheu seu quarto:</StyledTypography>
      <HotelsContainer>
        <HotelCard hotel={hotel} resume={true} />
      </HotelsContainer>
      <ChangeRoomButton>TROCAR DE QUARTO</ChangeRoomButton>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 16px!important;
`;

const ChangeRoomButton = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  margin-top: 40px;
  border: none;
`;
