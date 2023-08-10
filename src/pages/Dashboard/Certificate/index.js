import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import useEvent from '../../../hooks/api/useEvent';
import { useTicketByUserId } from '../../../hooks/api/useTicketTypes';
import { useActivitiesDone } from '../../../hooks/api/useActivity';
import BlockedMessage from './BlockedMessage';
import CertificateLink from './CertificateLink';

export default function Certificate() {
  const event = useEvent();
  const ticket = useTicketByUserId();
  const activities = useActivitiesDone();
  const showButtonPDF =
    (ticket.tickets && ticket.tickets.TicketType.name === 'Online') ||
    (activities.activities && activities.activities.length >= 5);

  return (
    <>
      <StyledTypography variant="h4">Certificado</StyledTypography>
      {!ticket.tickets || ticket.tickets.status !== 'PAID' ? (
        <BlockedMessage texto={'noPAID'} />
      ) : event.event && new Date() < new Date(event.event.endsAt) ? (
        <BlockedMessage texto={'noEndEvent'} />
      ) : showButtonPDF ? (
        <CertificateLink ticket={ticket} event={event} />
      ) : (
        <BlockedMessage texto={'noEnoughActivities'} />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
