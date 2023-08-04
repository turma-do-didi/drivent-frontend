import styled from 'styled-components';

export default function RoomCard({ room }) {
  return (
    <RoomCardContainer>
      {room.name}
    </RoomCardContainer>
        
  );
}

const RoomCardContainer = styled.div`
    width: 190px;
    height: 45px;
    border-radius: 10px;
    border: 1px solid #CECECE;
    margin-right: 17px;
    margin-bottom: 8px;
`;
