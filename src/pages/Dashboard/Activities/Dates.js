import { useActivities } from '../../../hooks/api/useActivity';
import styled from 'styled-components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/pt-br';
import useToken from '../../../hooks/useToken';

export default function Dates({ selectedDate, setSelectedDate, dates, setActivities }) {
  const token = useToken();
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

  return (
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
    </>
  );
}

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
