import { useActivityDates } from '../../../hooks/api/useActivity';
import { Typography } from '@material-ui/core';
import { blockedListActivityMessage } from '../../../utils/activityUtils';
import styled from 'styled-components';
import { useState } from 'react';
import Dates from './Dates';
import Locations from './Locations';

export default function Activities() {
  const dates = useActivityDates();
  const [selectedDate, setSelectedDate] = useState(null);
  const [activities, setActivities] = useState([]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {dates.datesError ? (
        <BlockedListActivitiesMessageContainer>
          {blockedListActivityMessage(dates.datesError.response.data)}
        </BlockedListActivitiesMessageContainer>
      ) : (
        <>
          <Dates
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dates={dates}
            setActivities={setActivities}
          />
          <Locations selectedDate={selectedDate} activities={activities} setActivities={setActivities} />
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
