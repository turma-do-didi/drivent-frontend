import Activity from './Activity';
import styled from 'styled-components';

export default function ActivitiesContainer({ activities, setActivities, location }) {
  function compareStartTime(a, b) {
    const startTimeA = new Date(a.startTime).getTime();
    const startTimeB = new Date(b.startTime).getTime();

    return startTimeA - startTimeB;
  }

  return (
    <Activities>
      {activities.length !== 0 &&
        activities
          .sort(compareStartTime)
          .map(
            (activity, index) =>
              activity.Location.name === location.name && (
                <Activity activity={activity} activities={activities} setActivities={setActivities} key={index} />
              )
          )}
    </Activities>
  );
}

const Activities = styled.div`
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
