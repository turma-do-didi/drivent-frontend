import { useActivities, useActivityDates, useCreateSubscription, useLocations } from '../../../hooks/api/useActivity';
import { Typography } from '@material-ui/core';
import { blockedListActivityMessage } from '../../../utils/activityUtils';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';
import useToken from '../../../hooks/useToken';
import utc from 'dayjs/plugin/utc';
import SubscriptionIcon from '../../../assets/images/subscription-icon.svg';
import SoldOutIcon from '../../../assets/images/sold-out-icon.svg';
import CheckIcon from '../../../assets/images/check-icon.svg';
import { toast } from 'react-toastify';

export default function Activities() {
  const dates = useActivityDates();
  const locations = useLocations();
  const token = useToken();
  const [selectedDate, setSelectedDate] = useState(null);
  const [activities, setActivities] = useState([]);
  dayjs.extend(utc);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    useActivities(token, date.activityDate)
      .then((activities) => {
        setActivities(activities);
      })
      .catch((_error) => {
        setActivities([]);
      });
  };

  function formatDateToCustomFormat(dateString) {
    dayjs.locale('pt-br');
    const dateObject = dayjs.utc(dateString);
    const formattedDate = dateObject.format('dddd, DD/MM');
    return formattedDate;
  }

  function calculateHourDifference(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    const differenceInMillis = Math.abs(date1 - date2);
    const differenceInHours = differenceInMillis / 3600000;

    return (80 * differenceInHours + 10 * (differenceInHours - 1)).toString() + 'px';
  }

  function extractHourFromDate(dateTimeString) {
    const dateObj = dayjs.utc(dateTimeString);
    const hourString = dateObj.format('HH:mm');
    return hourString;
  }

  function compareStartTime(a, b) {
    const startTimeA = new Date(a.startTime).getTime();
    const startTimeB = new Date(b.startTime).getTime();

    return startTimeA - startTimeB;
  }

  function isTimeOverlap(time1Start, time1End, time2Start, time2End) {
    return (
      (time1Start >= time2Start && time1Start < time2End) ||
      (time1End > time2Start && time1End <= time2End) ||
      (time1Start <= time2Start && time1End >= time2End)
    );
  }

  function subscription(activityIndex) {
    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities];
      const activity = updatedActivities.sort(compareStartTime)[activityIndex];

      const isAlreadySubscribed = updatedActivities.some((otherActivity) => {
        return (
          otherActivity.isSubscribed === true &&
          isTimeOverlap(activity.startTime, activity.endTime, otherActivity.startTime, otherActivity.endTime)
        );
      });

      if (isAlreadySubscribed) {
        toast('Você já está inscrito em uma atividade no mesmo horário.');
      } else {
        activity.isSubscribed = true;
        useCreateSubscription(token, activity.id).catch((_error) => {
          activity.isSubscribed = false;
          setActivities([...updatedActivities]);
          toast('Ocorreu um erro ao tentar se inscrever nessa atividade. Por favor, tente novamente!');
        });
      }

      return updatedActivities;
    });
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
                    <ActivitiesContainer>
                      {activities.length !== 0 &&
                        activities.sort(compareStartTime).map(
                          (activity, index) =>
                            activity.Location.name === location.name && (
                              <Activity
                                key={index}
                                height={calculateHourDifference(activity.startTime, activity.endTime)}
                                color={activity.isSubscribed ? '#D0FFDB' : '#F1F1F1'}
                              >
                                <div>
                                  <p>{activity.title}</p>
                                  <p>
                                    {extractHourFromDate(activity.startTime)} : {extractHourFromDate(activity.endTime)}
                                  </p>
                                </div>
                                <div>
                                  {activity.isSubscribed ? (
                                    <>
                                      <img src={CheckIcon} alt="Subscription Confirm" />
                                      <TextVacancies color={'#078632'}>Inscrito</TextVacancies>
                                    </>
                                  ) : activity.vacancies > 0 ? (
                                    <>
                                      <img
                                        src={SubscriptionIcon}
                                        alt="Subscription Button"
                                        onClick={() => subscription(index)}
                                      />
                                      <TextVacancies color={'#078632'}>{activity.vacancies} vagas</TextVacancies>
                                    </>
                                  ) : (
                                    <>
                                      <img src={SoldOutIcon} alt="Activity Sold Out" />
                                      <TextVacancies color={'#CC6666'}>Esgotado</TextVacancies>
                                    </>
                                  )}
                                </div>
                              </Activity>
                            )
                        )}
                    </ActivitiesContainer>
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
  }
`;

const ActivitiesContainer = styled.div`
  width: 290px;
  height: 390px;
  border: 1px solid #d7d7d7;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Activity = styled.div`
  width: calc(100% - 20px);
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  margin-top: 10px;
  border-radius: 5px;
  background: ${(props) => props.color};
  flex-shrink: 0;

  > div:nth-of-type(1) {
    width: 75%;
    height: calc(100% - 20px);
    border-right: 1px solid #cfcfcf;

    > p:nth-of-type(1) {
      width: calc(100% - 20px);
      color: #343434;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-left: 10px;
      margin-bottom: 6px;
    }

    > p:nth-of-type(2) {
      color: #343434;
      font-family: Roboto;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-left: 10px;
    }
  }

  > div:nth-of-type(2) {
    width: 25%;
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      margin-bottom: 5px;
      cursor: pointer;
    }
  }
`;

const TextVacancies = styled.p`
  color: ${(props) => props.color};
  font-family: Roboto;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
