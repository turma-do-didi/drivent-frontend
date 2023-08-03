import { useActivityDates, useLocations } from '../../../hooks/api/useActivity';
import { Typography } from '@material-ui/core';
import { blockedListActivityMessage } from '../../../utils/activityUtils';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';

export default function Activities() {
  const dates = useActivityDates();
  const locations = useLocations();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  function formatDateToCustomFormat(dateString) {
    dayjs.locale('pt-br');
    const dateObject = dayjs(dateString);
    const formattedDate = dateObject.format('dddd, DD/MM');
    return formattedDate;
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {dates.datesError ? (
        <BlockedListActivitiesMessageContainer>
          {blockedListActivityMessage(dates.datesError.response.data)}
        </BlockedListActivitiesMessageContainer>
      ) : (
        <>
          {selectedDate === null && <DateFilterInstruction>Primeiro, filtre pelo dia do evento:</DateFilterInstruction>}
          <DatesContainer>
            {dates.dates !== null &&
              dates.dates.map((date, index) => (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  style={{ backgroundColor: selectedDate === date ? '#FFD37D' : '#e0e0e0' }}
                >
                  <p>{formatDateToCustomFormat(date.activityDate)}</p>
                </div>
              ))}
          </DatesContainer>
          {selectedDate !== null && (
            <LocationsContainer>
              {locations.locations !== null &&
                locations.locations.map((location, index) => (
                  <div key={index}>
                    <p>{location.name}</p>
                    <div></div>
                  </div>
                ))}
            </LocationsContainer>
          )}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const BlockedListActivitiesMessageContainer = styled.div`
  width: 100%;
  height: 89%;
  display: flex;
  justify-content: center;
  align-items: center;

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

const DatesContainer = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  overflow: hidden;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  > div {
    width: 131px;
    height: 37px;
    flex-shrink: 0;
    border-radius: 4px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    margin-right: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > p {
      color: #000;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

const DateFilterInstruction = styled.p`
  color: #8e8e8e;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 13px;
`;

const LocationsContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;

    > p {
      color: #7b7b7b;
      text-align: center;
      font-family: Roboto;
      font-size: 17px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 10px;
    }

    > div {
      width: 290px;
      height: 390px;
      border: 1px solid #d7d7d7;
      overflow: hidden;
      overflow-y: auto;

      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
