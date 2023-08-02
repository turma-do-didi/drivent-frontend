import styled from 'styled-components';
import { blockedBookingMessage } from '../../utils/hotelUtils';
import { Typography } from '@material-ui/core';

export default function BlockedBooking({ error }) {
  return (
    <BlockedBookingMessageWrapper>
      <StyledTypography variant='h5' color='textSecondary' align='center' >{blockedBookingMessage(error.response.data)}</StyledTypography>
    </BlockedBookingMessageWrapper>
  );
}

// FIX NA FONTE

const BlockedBookingMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  background-color: aliceblue;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
  max-width: 464px;
`;
