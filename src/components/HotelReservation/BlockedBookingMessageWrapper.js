import styled from 'styled-components';

export const BlockedBookingMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  background-color: aliceblue;
  box-sizing: border-box;
  > h1 {
    width: 411px;
    color: #8E8E8E;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media (max-width: 600px) {
    > div {
      width: 100%;
      padding-left: 0px !important;
    }
  }
`;
