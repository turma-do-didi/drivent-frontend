import styled from 'styled-components';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';

export default function RoomCard({ room, selectedRoom, setSelectedRoom }) {
  const renderPlaces = () => {
    const closedVacancy = room.Booking.length;
    let openVacancy = room.capacity - room.Booking.length;
    if (selectedRoom) {
      if (selectedRoom.id === room.id) {
        openVacancy--;
      }
      return (
        <div>
          {Array(openVacancy)
            .fill()
            .map((_, i) => (
              <BsPerson key={i} size={'27px'} />
            ))}
          {selectedRoom && selectedRoom.id === room.id && <StyledReservedIcon color="#FF4791" />}
          {Array(closedVacancy)
            .fill()
            .map((_, i) => (
              <StyledReservedIcon key={i} color={iconColor} />
            ))}
        </div>
      );
    } else {
      return (
        <div>
          {Array(openVacancy)
            .fill()
            .map((_, i) => (
              <BsPerson key={i} size={'27px'} />
            ))}
          {Array(closedVacancy)
            .fill()
            .map((_, i) => (
              <StyledReservedIcon key={i} color={iconColor} />
            ))}
        </div>
      );
    }
  };

  const iconColor = () => {
    if (room.capacity === room.Booking.length) {
      return '#8C8C8C';
    } else {
      return '#000000';
    }
  };

  const textColor = () => {
    if (room.capacity === room.Booking.length) {
      return '#9D9D9D';
    } else {
      return '#454545';
    }
  };

  const backgroundColor = () => {
    if (room.capacity === room.Booking.length) {
      return '#E9E9E9';
    } else if (selectedRoom && selectedRoom.id === room.id) {
      return '#FFEED2';
    } else {
      return '';
    }
  };

  const selectRoom = () => {
    if (room.capacity !== room.Booking.length) {
      setSelectedRoom(room);
    }
  };

  return (
    <RoomCardContainer textColor={textColor} backgroundColor={backgroundColor} onClick={selectRoom}>
      <h1>{room.name}</h1>
      {renderPlaces()}
    </RoomCardContainer>
  );
}

const RoomCardContainer = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #cecece;
  margin-right: 17px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;

  h1 {
    color: ${(props) => props.textColor};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    max-width: 70px;
    max-height: 23px;
    overflow: hidden;
    margin-left: 6px;
  }
`;

const StyledReservedIcon = styled(BsFillPersonFill)`
  width: 27px;
  height: 27px;
  color: ${(props) => props.color};
`;
