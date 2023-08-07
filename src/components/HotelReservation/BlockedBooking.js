import styled from 'styled-components';
import { blockedBookingMessage } from '../../utils/hotelUtils';
import { Typography } from '@material-ui/core';

export default function BlockedBooking({ error }) {
  return (
    <BlockedBookingMessageWrapper>
      <StyledTypography variant="h5" color="textSecondary" align="center">
        {blockedBookingMessage(error.response.data)}
      </StyledTypography>
    </BlockedBookingMessageWrapper>
  );
}

// FIX NA FONTE

const BlockedBookingMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 89%;
`;

const StyledTypography = styled(Typography)`
  > h1 {
    color: #8e8e8e;
    text-align: center;
    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
