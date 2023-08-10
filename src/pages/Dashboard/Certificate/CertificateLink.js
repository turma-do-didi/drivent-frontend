import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificateFile from '../../../components/CertificateFile';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useState } from 'react';
import styled from 'styled-components';

export default function CertificateLink({ ticket, event }) {
  const enrollment = useEnrollment();
  const [showPDF, setShowPDF] = useState(false);

  const openPDF = (url) => {
    window.open(url, '_blank');
    setShowPDF(false);
  };

  return (
    <>
      <CertificateText>Clique no botão abaixo para gerar seu certificado de participação.</CertificateText>
      <CertificateButton onClick={() => setShowPDF(true)}>GERAR CERTIFICADO</CertificateButton>
      {showPDF && (
        <PDFDownloadLink
          document={
            <CertificateFile
              username={enrollment.enrollment.name}
              modality={ticket.tickets.TicketType.name}
              event={event}
              cpf={enrollment.enrollment.cpf}
            />
          }
          fileName="certificado_drivent.pdf"
        >
          {({ blob, url, loading, error }) => {
            if (!loading && url) {
              openPDF(url);
            }
          }}
        </PDFDownloadLink>
      )}
    </>
  );
}

const CertificateText = styled.p`
  color: #8e8e8e;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 23px;
  cursor: default;
`;

const CertificateButton = styled.button`
  width: 175px;
  height: 37px;
  border-radius: 4px;
  background: #e0e0e0;
  border: none;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;
