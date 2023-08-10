import React from 'react';
import styled from 'styled-components';

export default function BlockedMessage({ texto }) {
  return (
    <BlockedCertificateMessage>
      {texto === 'noPAID' ? (
        <h1>
          Você precisa ter confirmado pagamento antes <br />
          para visualizar o seu certificado.
        </h1>
      ) : texto === 'noEndEvent' ? (
        <h1>O certificado ficará disponível apenas 1 dia após a realização do evento.</h1>
      ) : (
        texto === 'noEnoughActivities' && (
          <h1>
            Para ter direito ao certificado, era necessário <br />a participação em pelo menos 5 atividades do evento.
          </h1>
        )
      )}
    </BlockedCertificateMessage>
  );
}

const BlockedCertificateMessage = styled.div`
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
    cursor: default;
  }
`;
