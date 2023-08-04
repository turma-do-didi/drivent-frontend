import useToken from '../../../hooks/useToken';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import styled from 'styled-components';
import SubscriptionIcon from '../../../assets/images/subscription-icon.svg';
import SoldOutIcon from '../../../assets/images/sold-out-icon.svg';
import CheckIcon from '../../../assets/images/check-icon.svg';
import { toast } from 'react-toastify';
import { useCreateSubscription, useDeleteSubscription } from '../../../hooks/api/useActivity';

export default function Activity({ activity, activities, setActivities }) {
  const token = useToken();
  dayjs.extend(utc);

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

  function isTimeOverlap(time1Start, time1End, time2Start, time2End) {
    return (
      (time1Start >= time2Start && time1Start < time2End) ||
      (time1End > time2Start && time1End <= time2End) ||
      (time1Start <= time2Start && time1End >= time2End)
    );
  }

  function subscription(activity) {
    const isAlreadySubscribed = activities.some((otherActivity) => {
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
        setActivities([...activities]);
        toast('Ocorreu um erro ao tentar se inscrever nessa atividade. Por favor, tente novamente!');
      });
    }
    setActivities([...activities]);
  }

  function deleteSubscription(activity) {
    activity.isSubscribed = false;
    useDeleteSubscription(token, activity.id)
      .then((_res) => {
        setActivities([...activities]);
      })
      .catch((_error) => {
        activity.isSubscribed = true;
        setActivities([...activities]);
        toast('Ocorreu um erro ao tentar cancelar a sua inscrição nessa atividade. Por favor, tente novamente!');
      });
    setActivities([...activities]);
  }

  return (
    <ActivityContainer
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
            <img src={CheckIcon} alt="Subscription Confirm" onClick={() => deleteSubscription(activity)} />
            <TextVacancies color={'#078632'}>Inscrito</TextVacancies>
          </>
        ) : activity.vacancies > 0 ? (
          <>
            <img src={SubscriptionIcon} alt="Subscription Button" onClick={() => subscription(activity)} />
            <TextVacancies color={'#078632'}>{activity.vacancies} vagas</TextVacancies>
          </>
        ) : (
          <>
            <img src={SoldOutIcon} alt="Activity Sold Out" />
            <TextVacancies color={'#CC6666'}>Esgotado</TextVacancies>
          </>
        )}
      </div>
    </ActivityContainer>
  );
}

const ActivityContainer = styled.div`
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
