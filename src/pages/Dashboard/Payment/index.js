import styled from 'styled-components';
import { useTicket } from '../../../hooks/api/useTicket.js';
import { Typography } from '@material-ui/core';
import useEnrollment from '../../../hooks/api/useEnrollment.js';
import { useState } from 'react';
import useCreateReservation from '../../../hooks/api/useCreateReservation.js';
import { toast } from 'react-toastify';
import PaymentForm from '../../../components/CreditCard.js';
import usePayment from '../../../hooks/api/usePayment.js';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

export default function Payment() {
  const { tickets } = useTicket();
  const { enrollment } = useEnrollment();
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [reservationHasClicked, setReservationHasClicked] = useState(false);
  const { reservationResume, postReservation } = useCreateReservation();
  const { paymentConfirmation, postPayment } = usePayment();

  const isInPerson = 0;

  function handleTicketType(id) {
    setSelectedTicketType(id);
    if (id !== isInPerson) {
      setSelectedAccommodation(null);
      setSelectedTicketId(id);
    } else {
      setSelectedTicketId(selectedAccommodation !== null ? selectedAccommodation : id);
    }
  }

  function handleAccommodation(id) {
    setSelectedAccommodation(id);
    setSelectedTicketId(id);
  }

  async function handleReservation() {
    const data = {
      ticketTypeId: selectedTicketId,
    };

    try {
      await postReservation(data);
      setReservationHasClicked(true);
      toast('Ingresso reservado com sucesso!');
    } catch (err) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  let ticketResume;
  let reservationTicketId;

  if (reservationResume) {
    const { TicketType: ticketType, id } = reservationResume;

    const statusParts = [];
    if (ticketType.isRemote) {
      statusParts.push('Online');
    } else {
      statusParts.push('Presencial');
      if (ticketType.includesHotel) {
        statusParts.push('+ Com hotel');
      } else {
        statusParts.push('sem hotel');
      }
    }

    ticketResume = {
      status: statusParts.join(' '),
      price: ticketType.price,
    };

    reservationTicketId = id;
  }

  let ticketsType;
  let accommodationType;
  let ticketsTypeWithIdZero;
  let priceInPersonWithoutHotel;
  let totalPrice;
  if (tickets) {
    ticketsType = tickets.filter(
      (ticket) => (ticket.isRemote === false && ticket.includesHotel === false) || ticket.isRemote === true
    );

    if (ticketsType) {
      ticketsTypeWithIdZero = ticketsType.map((ticket) => {
        if (!ticket.isRemote && !ticket.includesHotel) {
          return { ...ticket, id: isInPerson };
        } else {
          return ticket;
        }
      });
    }

    accommodationType = tickets.filter((ticket) => ticket.isRemote === false);

    priceInPersonWithoutHotel = tickets.find(
      (ticket) => ticket.isRemote === false && ticket.includesHotel === false
    )?.price;

    totalPrice = tickets.find((ticket) => ticket.id === selectedTicketId)?.price;
  }

  return (
    <>
      {!reservationHasClicked && (
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

          {!enrollment && (
            <NoEnrollmentContainer>
              <div>
                <StyledTypography align="center" variant="subtitle1">
                  Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso
                </StyledTypography>
              </div>
            </NoEnrollmentContainer>
          )}

          {enrollment && (
            <>
              <Subtitle>Primeiro, escolha sua modalidade de ingresso</Subtitle>
              <TicketTypeContainer>
                {ticketsTypeWithIdZero &&
                  ticketsTypeWithIdZero.map((e) => {
                    return (
                      <TicketTypeButton
                        selected={e.id === selectedTicketType}
                        onClick={() => handleTicketType(e.isRemote ? e.id : 0)}
                        key={e.id}
                      >
                        <TicketType>{e.isRemote ? 'Online' : 'Presencial'}</TicketType>
                        <TicketPrice>R$ {e.price}</TicketPrice>
                      </TicketTypeButton>
                    );
                  })}
              </TicketTypeContainer>

              {selectedTicketType === isInPerson && (
                <>
                  <Subtitle>Ótimo! Agora escolha sua modalidade de hospedagem</Subtitle>
                  <TicketTypeContainer>
                    {accommodationType.map((e) => {
                      return (
                        <TicketTypeButton
                          selected={e.id === selectedAccommodation}
                          onClick={() => handleAccommodation(e.id)}
                          key={e.id}
                        >
                          <TicketType>{e.includesHotel ? 'Com Hotel' : 'Sem Hotel'}</TicketType>
                          <TicketPrice>+ R$ {e.includesHotel ? e.price - priceInPersonWithoutHotel : '0'}</TicketPrice>
                        </TicketTypeButton>
                      );
                    })}
                  </TicketTypeContainer>
                </>
              )}

              {selectedTicketId !== null && selectedTicketId !== isInPerson && (
                <>
                  <Subtitle>Fechado! O total ficou em R$ {totalPrice}. Agora é só confirmar:</Subtitle>
                  <TicketTypeContainer>
                    <CreateReservationButton onClick={handleReservation}>RESERVAR INGRESSO</CreateReservationButton>
                  </TicketTypeContainer>
                </>
              )}
            </>
          )}
        </>
      )}

      {reservationHasClicked && (
        <>
          <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

          {enrollment && (
            <>
              <Subtitle>Ingresso escolhido</Subtitle>
              <TicketTypeContainer>
                <TicketResume>
                  <TicketType>{ticketResume.status}</TicketType>
                  <TicketPrice>R$ {ticketResume.price}</TicketPrice>
                </TicketResume>
              </TicketTypeContainer>

              <Subtitle>Pagamento</Subtitle>
              <CreditCardContainer>
                {!paymentConfirmation && (
                  <PaymentForm reservationTicketId={reservationTicketId} postPayment={postPayment} />
                )}
              </CreditCardContainer>
              {paymentConfirmation && (
                <IconContext.Provider value={{ color: '#36B853', size: '3em', className: 'global-class-name' }}>
                  <ConfirmedPaymentContainer>
                    <BsFillCheckCircleFill />
                    <ConfirmedPaymentTextContainer>
                      <h4>Pagamento confirmado!</h4>
                      <p>Prossiga para escolha de hospedagem e atividades</p>
                    </ConfirmedPaymentTextContainer>
                  </ConfirmedPaymentContainer>
                </IconContext.Provider>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;

const NoEnrollmentContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;
  height: 70% !important;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 388px !important;
    color: #8e8e8e;
  }
`;

const TicketTypeContainer = styled.div`
  display: flex;
`;

const CreditCardContainer = styled.div``;

const Subtitle = styled.h5`
  font-size: 20px;
  color: #8e8e8e;
  font-weight: 400;
`;

const TicketTypeButton = styled.div`
  margin: 17px 24px 44px 0px;
  height: 145px;
  width: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#FFEED2' : 'transparent')};

  :hover {
    cursor: pointer;
  }
`;

const TicketResume = styled.div`
  margin: 17px 24px 44px 0px;
  height: 108px;
  width: 290px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffeed2;
`;

const TicketType = styled.p`
  color: #454545;
  size: 16px;
`;

const TicketPrice = styled.p`
  margin-top: 5px;
  color: #898989;
  font-size: 14px;
`;

const CreateReservationButton = styled.button`
  width: 180px;
  height: 37px;
  background-color: #dddddd;
  border-radius: 4px;
  border: none;
  margin-top: 17px;
  font-size: 14px;
  font-weight: 500;

  :hover {
    cursor: pointer;
  }
`;

const ConfirmedPaymentContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ConfirmedPaymentTextContainer = styled.div`
  margin-left: 12px;
  color: #454545;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > h4 {
    font-weight: 700;
    line-height: 18px;
  }
`;
