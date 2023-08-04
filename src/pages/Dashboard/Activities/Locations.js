import { useLocations } from '../../../hooks/api/useActivity';
import styled from 'styled-components';
import ActivitiesContainer from './ActivitiesContainer';

export default function Locations({ selectedDate, activities, setActivities }) {
  const locations = useLocations();

  return (
    selectedDate !== null && (
      <LocationsContainer>
        {locations.locations !== null &&
          locations.locations.map((location, index) => (
            <div key={index}>
              <p>{location.name}</p>
              <ActivitiesContainer
                activities={activities}
                setActivities={setActivities}
                location={location}
                key={index}
              />
            </div>
          ))}
      </LocationsContainer>
    )
  );
}

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
